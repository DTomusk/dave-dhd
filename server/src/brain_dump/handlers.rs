use axum::extract::State;

use crate::{app_state::AppState, brain_dump::dto::BrainDumpPostRequest};

#[utoipa::path(
    post,
    path = "/brain-dump",
    tag = "brain-dump",
    request_body = BrainDumpPostRequest,
    responses(
        (status = 200, description = "Brain dump posted successfully")
    ),
    security(
        ("bearerAuth" = [])
    ),
)]
pub async fn post_brain_dump(
    State(_app_state): State<AppState>,
) -> Result<&'static str, String> {
    Ok("brain dump successfully posted")
}