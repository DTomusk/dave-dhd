use axum::{Json, extract::State};
use uuid::Uuid;

use crate::{app_state::AppState, auth::model::AuthUser, brain_dump::{dto::BrainDumpPostRequest, model::BrainDump}};

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
    State(app_state): State<AppState>,
    AuthUser { id }: AuthUser,
    Json(request): Json<BrainDumpPostRequest>,
) -> Result<(), String> {
    let user_id = Uuid::parse_str(&id).map_err(|e| e.to_string())?;
    let command = BrainDump::new(user_id, request.content);
    app_state.brain_dump_service.insert_brain_dump(&command.into()).await.map_err(|e| e.to_string())?;
    Ok(())
}