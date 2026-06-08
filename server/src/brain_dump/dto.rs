use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Deserialize, ToSchema)]
pub struct BrainDumpPostRequest {
    pub content: String,
}

#[derive(Serialize, Debug, ToSchema)]
pub struct BrainDumpResponse {
    pub id: String,
    pub content: String,
    pub created_at: String,
}