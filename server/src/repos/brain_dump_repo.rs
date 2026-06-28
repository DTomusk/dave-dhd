use sqlx::PgPool;

use crate::brain_dump::model::{BrainDump, BrainDumpQuery};

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

    /// Get brain dumps for a user with pagination
    pub async fn get_brain_dumps(&self, query: &BrainDumpQuery) -> Result<(Vec<BrainDump>, u64), sqlx::Error> {
        let brain_dumps = sqlx::query_as!(
            BrainDump,
            r#"
            SELECT id, user_id, content, created_at, deleted_at
            FROM brain_dumps
            WHERE user_id = $1 AND deleted_at IS NULL
            ORDER BY created_at DESC
            OFFSET $2
            LIMIT $3
            "#,
            query.user_id,
            query.offset as i64,
            query.limit as i64,
        )
        .fetch_all(&self.pool)
        .await?;

        let total_count: i64 = sqlx::query_scalar!(
            r#"
            SELECT COUNT(*)
            FROM brain_dumps
            WHERE user_id = $1 AND deleted_at IS NULL
            "#,
            query.user_id,
        )
        .fetch_one(&self.pool)
        .await?
        .unwrap_or(0);

        Ok((brain_dumps, total_count as u64))
    }
}