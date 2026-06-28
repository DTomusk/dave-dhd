use axum::{Router, routing::{delete, get, post}};
use crate::app_state::AppState;
use super::handlers;

pub fn protected_router() -> Router<AppState> {
    Router::new()
        .route("/brain-dump", get(handlers::get_brain_dumps))
        .route("/brain-dump", post(handlers::post_brain_dump))
        .route("/brain-dump", delete(handlers::delete_brain_dumps))
}