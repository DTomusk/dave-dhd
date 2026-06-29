use std::{net::SocketAddr, sync::Arc};
use sqlx::postgres::PgPoolOptions;
use tracing::info;

use server::{
    app, 
    app_state::AppState, 
    auth::service::AuthService, 
    brain_dump::service::BrainDumpService, 
    config::Config, 
};

// tokio multithreaded runtime needs to be enabled, use full features for simplicity
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load environment variables from .env
    dotenvy::dotenv().ok();

    tracing_subscriber::fmt()
        // From default env uses RUST_LOG env variable to set log level
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let config = Config::from_env()?;

    let db_pool = PgPoolOptions::new()
        .max_connections(10)
        .connect(&config.database_url)
        .await
        .expect("Failed to connect to database");

    let auth_service = Arc::new(
        AuthService::new(db_pool.clone(), config.jwt_secret.clone(), config.jwt_expiration_minutes)
    );

    let brain_dump_service = Arc::new(
        BrainDumpService::new(db_pool.clone())
    );

    let app_state = AppState {
        auth_service,
        brain_dump_service,
    };

    let app = app::build(app_state, config.allowed_origins.clone());

    let addr = format!("0.0.0.0:{}", config.port);
    let listener = tokio::net::TcpListener::bind(&addr).await?;

    info!(%addr, "server is starting");

    axum::serve(
        listener, 
        app.into_make_service_with_connect_info::<SocketAddr>())
        .with_graceful_shutdown(shutdown_signal())
        .await?;

    // Note: no semicolon -> expression (not statement)
    Ok(())
}

async fn shutdown_signal() {
    use tokio::signal;

    // listen for CTRL+C signal
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("failed to listen for CTRL+C signal");
    };

    // depending on the platform, we may want to listen for different shutdown signals
    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("failed to listen for SIGTERM signal")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>(); // never completes on non-unix

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }

    tracing::info!("shutdown signal received, starting graceful shutdown");
}