use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use thiserror::Error;
use serde_json::json;

#[derive(Debug, Error)]
pub enum BrainDumpError {
    #[error("Validation error: {0}")]
    ValidationError(String),
    #[error("Database error: {0}")]
    DatabaseError(String),
    #[error("Not found: {0}")]
    NotFound(String),
}

impl IntoResponse for BrainDumpError {
    fn into_response(self) -> Response {
        let (status, error_message) = match self {
            BrainDumpError::ValidationError(_) => (StatusCode::BAD_REQUEST, self.to_string()),
            BrainDumpError::DatabaseError(_) => (StatusCode::INTERNAL_SERVER_ERROR, self.to_string()),
            BrainDumpError::NotFound(_) => (StatusCode::NOT_FOUND, self.to_string()),
        };

        let body = Json(json!({ "error": error_message }));
        (status, body).into_response()
    }
}