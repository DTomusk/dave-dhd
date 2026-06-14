use serde::{Deserialize, Serialize};
use time::OffsetDateTime;
use utoipa::ToSchema;
use validator::{Validate, ValidationError};

#[derive(Deserialize, ToSchema, Validate)]
pub struct BrainDumpPostRequest {
    #[validate(length(min = 1, max = 1000), custom(function = "validate_not_blank"))]
    pub content: String,
}

#[derive(Serialize, Debug, ToSchema)]
pub struct BrainDumpResponse {
    pub id: String,
    pub content: String,
    #[serde(with = "time::serde::rfc3339")]
    pub created_at: OffsetDateTime,
}

fn validate_not_blank(content: &str) -> Result<(), ValidationError> {
    if content.trim().is_empty() {
        return Err(ValidationError::new("content cannot be blank"));
    }
    Ok(())
}