use time::OffsetDateTime;
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow)]
pub struct BrainDump {
    pub id: Uuid,
    pub user_id: Uuid,
    pub content: String,
    pub created_at: OffsetDateTime,
    pub deleted_at: Option<OffsetDateTime>,
}

impl BrainDump {
    pub fn new(user_id: Uuid, content: String) -> Self {
        Self { 
            id: Uuid::new_v4(), 
            user_id,
            content: content.trim().to_string(),
            created_at: OffsetDateTime::now_utc(),
            deleted_at: None,
        }
    }
}

pub struct BrainDumpQuery {
    pub user_id: Uuid,
    pub offset: u32,
    pub limit: u32,
}

pub struct BrainDumpDeleteCommand {
    pub user_id: Uuid,
    pub dump_ids: Vec<Uuid>,
}