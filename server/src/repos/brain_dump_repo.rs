use sqlx::PgPool;

use crate::brain_dump::model::BrainDump;

pub struct BrainDumpRepo {
    pub pool: PgPool,
}

impl BrainDumpRepo {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }

    pub async fn insert_brain_dump(&self, brain_dump: &BrainDump) -> Result<(), sqlx::Error> {
        sqlx::query!(
            r#"
            INSERT INTO brain_dumps (id, user_id, content)
            VALUES ($1, $2, $3)
            "#,
            brain_dump.id,
            brain_dump.user_id,
            brain_dump.content,
        )
        .execute(&self.pool)
        .await?;
        Ok(())
    }
}