use axum::{Json, debug_handler, extract::{Query, State}};
use uuid::Uuid;
use validator::Validate;

use crate::{
    app_state::AppState, 
    auth::model::AuthUser, 
    brain_dump::{
        dto::{BrainDumpDeleteRequest, BrainDumpPostRequest, BrainDumpResponse}, errors::BrainDumpError, model::{BrainDump, BrainDumpDeleteCommand, BrainDumpQuery}
    }, 
    shared::pagination::dto::{
        OffsetPaginationQuery, 
        OffsetPaginationResponse,
    },
};

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
    Json(req): Json<BrainDumpPostRequest>,
) -> Result<(), BrainDumpError> {
    let user_id = Uuid::parse_str(&id).map_err(|e| BrainDumpError::ValidationError(e.to_string()))?;
    req.validate().map_err(|e| BrainDumpError::ValidationError(e.to_string()))?;
    let command = BrainDump::new(user_id, req.content);
    app_state.brain_dump_service.insert_brain_dump(&command).await.map_err(|e| BrainDumpError::DatabaseError(e.to_string()))?;
    Ok(())
}

#[utoipa::path(
    get,
    path = "/brain-dump",
    tag = "brain-dump",
    params(OffsetPaginationQuery),
    responses(
        (status = 200, body = OffsetPaginationResponse<BrainDumpResponse>, description = "Brain dumps retrieved successfully")
    ),
    security(
        ("bearerAuth" = [])
    ),
)]
#[debug_handler]
pub async fn get_brain_dumps(
    State(app_state): State<AppState>,
    AuthUser { id }: AuthUser,
    Query(req): Query<OffsetPaginationQuery>,
) -> Result<Json<OffsetPaginationResponse<BrainDumpResponse>>, BrainDumpError> {
    let user_id = Uuid::parse_str(&id).map_err(|e| BrainDumpError::ValidationError(e.to_string()))?;
    // normalise pagination to ensure limit is within bounds
    let pagination = req.normalise();

    let query = BrainDumpQuery {
        user_id,
        offset: pagination.offset,
        limit: pagination.limit,
    };

    let (brain_dumps, total_count) = app_state.brain_dump_service.get_brain_dumps(&query).await.map_err(|e| BrainDumpError::DatabaseError(e.to_string()))?;

    let brain_dump_responses: Vec<BrainDumpResponse> = brain_dumps.into_iter().map(|bd| BrainDumpResponse {
        id: bd.id.to_string(),
        content: bd.content,
        created_at: bd.created_at,
    }).collect();

    Ok(Json(OffsetPaginationResponse::new(brain_dump_responses, total_count, pagination.offset, pagination.limit)))
}

#[utoipa::path(
    delete,
    path = "/brain-dump",
    tag = "brain-dump",
    request_body = BrainDumpDeleteRequest,
    responses(
        (status = 200, description = "Brain dumps deleted successfully")
    ),
    security(
        ("bearerAuth" = [])
    ),
)]
pub async fn delete_brain_dumps(
    State(app_state): State<AppState>,
    AuthUser { id }: AuthUser,
    Json(req): Json<BrainDumpDeleteRequest>,
) -> Result<(), BrainDumpError> {
    let user_id = Uuid::parse_str(&id).map_err(|e| BrainDumpError::ValidationError(e.to_string()))?;
    req.validate().map_err(|e| BrainDumpError::ValidationError(e.to_string()))?;
    
    let command = BrainDumpDeleteCommand {
        user_id,
        ids: req.ids.into_iter().map(|id| Uuid::parse_str(&id).map_err(|e| BrainDumpError::ValidationError(e.to_string()))).collect::<Result<Vec<Uuid>, BrainDumpError>>()?,
    };

    app_state.brain_dump_service.delete_brain_dumps(&command).await.map_err(|e| BrainDumpError::DatabaseError(e.to_string()))?;
    Ok(())
}