use serde::{Deserialize, Serialize};
use time::OffsetDateTime;
use utoipa::ToSchema;

#[derive(Deserialize, ToSchema)]
pub struct BrainDumpPostRequest {
    pub content: String,
}

#[derive(Serialize, Debug, ToSchema)]
pub struct BrainDumpResponse {
    pub id: String,
    pub content: String,
    #[serde(with = "time::serde::rfc3339")]
    pub created_at: OffsetDateTime,
}