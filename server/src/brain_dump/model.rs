#[derive(Debug, Clone, sqlx::FromRow)]
pub struct BrainDump {
    pub id: uuid::Uuid,
    pub user_id: uuid::Uuid,
    pub content: String,
    pub created_at: chrono::DateTime<chrono::Utc>,
}

impl BrainDump {
    pub fn new(user_id: uuid::Uuid, content: String) -> Self {
        Self { 
            id: uuid::Uuid::new_v4(), 
            user_id,
            content,
            created_at: chrono::Utc::now(),
        }
    }
}