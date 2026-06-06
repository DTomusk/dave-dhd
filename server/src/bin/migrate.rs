use sqlx::postgres::PgPoolOptions;
use server::config::Config;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenvy::dotenv().ok();
    let config = Config::from_env()?;

    let pool = PgPoolOptions::new()
        .connect(&config.database_url)
        .await?;

    sqlx::migrate!("./migrations")
        .run(&pool)
        .await?;

    Ok(())
}