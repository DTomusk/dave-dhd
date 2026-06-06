use serde::Deserialize;
use utoipa::ToSchema;

#[derive(Deserialize, ToSchema)]
pub struct BrainDumpPostRequest {
    pub content: String,
}