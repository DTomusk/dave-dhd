use time::OffsetDateTime;

#[derive(Debug, Clone, sqlx::FromRow)]
pub struct BrainDump {
    pub id: uuid::Uuid,
    pub user_id: uuid::Uuid,
    pub content: String,
    pub created_at: OffsetDateTime,
    pub deleted_at: Option<OffsetDateTime>,
}

impl BrainDump {
    pub fn new(user_id: uuid::Uuid, content: String) -> Self {
        Self { 
            id: uuid::Uuid::new_v4(), 
            user_id,
            content: content.trim().to_string(),
            created_at: OffsetDateTime::now_utc(),
            deleted_at: None,
        }
    }
}

pub struct BrainDumpQuery {
    pub user_id: uuid::Uuid,
    pub offset: u32,
    pub limit: u32,
}

pub struct BrainDumpDeleteCommand {
    pub user_id: uuid::Uuid,
    pub ids: Vec<uuid::Uuid>,
}