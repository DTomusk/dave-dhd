use std::collections::HashSet;

use serde::{Deserialize, Serialize};
use time::OffsetDateTime;
use utoipa::ToSchema;
use uuid::Uuid;
use validator::{Validate, ValidationError};

use crate::shared::validation::validate_not_blank;

#[derive(Deserialize, ToSchema, Validate)]
pub struct BrainDumpPostRequest {
    #[validate(length(min = 1, max = 1000), custom(function = "validate_not_blank"))]
    pub content: String,
}

#[derive(Deserialize, ToSchema, Validate)]
pub struct BrainDumpDeleteRequest {
    #[validate(length(min = 1))]
    pub ids: Vec<String>,
}

#[derive(Serialize, Debug, ToSchema)]
pub struct BrainDumpResponse {
    pub id: String,
    pub content: String,
    #[serde(with = "time::serde::rfc3339")]
    pub created_at: OffsetDateTime,
}

impl BrainDumpDeleteRequest {
    /// Converts the DTO into a domain command, validating the UUIDs and removing duplicates.
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

#[cfg(test)]
mod tests {
    use super::BrainDumpDeleteRequest;
    use uuid::Uuid;

    #[test]
    fn to_command_returns_command_for_unique_valid_uuids() {
        let user_id = Uuid::new_v4();
        let id1 = Uuid::new_v4();
        let id2 = Uuid::new_v4();

        let req = BrainDumpDeleteRequest {
            ids: vec![id1.to_string(), id2.to_string()],
        };

        let cmd = req.to_command(user_id).expect("expected valid command");

        assert_eq!(cmd.user_id, user_id);
        assert_eq!(cmd.dump_ids, vec![id1, id2]);
    }

    #[test]
    fn to_command_rejects_duplicate_ids() {
        let user_id = Uuid::new_v4();
        let id = Uuid::new_v4().to_string();

        let req = BrainDumpDeleteRequest {
            ids: vec![id.clone(), id],
        };

        let err = req.to_command(user_id).expect_err("expected duplicate_id error");
        assert_eq!(err.code.as_ref(), "duplicate_id");
    }

    #[test]
    fn to_command_rejects_invalid_uuid() {
        let user_id = Uuid::new_v4();

        let req = BrainDumpDeleteRequest {
            ids: vec!["not-a-uuid".to_string()],
        };

        let err = req.to_command(user_id).expect_err("expected invalid_uuid error");
        assert_eq!(err.code.as_ref(), "invalid_uuid");
    }

    #[test]
    fn to_command_allows_empty_ids_if_validate_not_called() {
        let user_id = Uuid::new_v4();

        let req = BrainDumpDeleteRequest { ids: vec![] };

        let cmd = req.to_command(user_id).expect("to_command does not enforce non-empty");
        assert!(cmd.dump_ids.is_empty());
    }
}