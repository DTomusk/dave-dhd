use std::collections::HashSet;

use serde::{Deserialize, Serialize};
use time::OffsetDateTime;
use utoipa::ToSchema;
use uuid::Uuid;
use validator::{Validate, ValidationError};

#[derive(Deserialize, ToSchema, Validate)]
pub struct BrainDumpPostRequest {
    #[validate(length(min = 1, max = 1000), custom(function = "validate_not_blank"))]
    pub content: String,
}

#[derive(Deserialize, ToSchema, Validate)]
pub struct BrainDumpDeleteRequest {
    #[validate(length(min = 1), custom(function = "validate_ids_are_uuids"))]
    pub ids: Vec<String>,
}

#[derive(Serialize, Debug, ToSchema)]
pub struct BrainDumpResponse {
    pub id: String,
    pub content: String,
    #[serde(with = "time::serde::rfc3339")]
    pub created_at: OffsetDateTime,
}

// TODO: eventually this will be a helper function in a shared crate
fn validate_not_blank(content: &str) -> Result<(), ValidationError> {
    if content.trim().is_empty() {
        return Err(ValidationError::new("content cannot be blank"));
    }
    Ok(())
}

// TODO: same as above, this should be a shared validator function
fn validate_ids_are_uuids(ids: &[String]) -> Result<(), ValidationError> {
    for id in ids {
        if Uuid::parse_str(id).is_err() {
            return Err(ValidationError::new("invalid_uuid"));
        }
    }
    Ok(())
}

impl BrainDumpDeleteRequest {
    pub fn to_command(&self, user_id: Uuid) -> Result<super::model::BrainDumpDeleteCommand, ValidationError> {
        let mut seen = HashSet::with_capacity(self.ids.len());
        let mut out: Vec<Uuid> = Vec::with_capacity(self.ids.len());
        for id in &self.ids {
            if !seen.insert(id) {
                return Err(ValidationError::new("duplicate_id"));
            }
            out.push(Uuid::parse_str(id).map_err(|_| ValidationError::new("invalid_uuid"))?);
        }
        
        Ok(super::model::BrainDumpDeleteCommand {
            user_id,
            dump_ids: out,
        })
    }
}