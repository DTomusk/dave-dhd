use thiserror::Error;

#[derive(Debug, Error)]
pub enum InfrastructureError {
    /// Generic database error, wraps the original error message
    #[error("Database error: {0}")]
    DatabaseError(String),
}

