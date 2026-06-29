use sqlx::PgPool;

use crate::{
    brain_dump::{
        model::{
            BrainDump, 
            BrainDumpQuery,
        },
    }, 
    repos::errors::InfrastructureError::{self, DatabaseError},
};

/// Insert a new brain dump into the database
pub async fn insert_brain_dump(pool: &PgPool, brain_dump: &BrainDump) -> Result<(), InfrastructureError> {
    sqlx::query!(
        r#"
        INSERT INTO brain_dumps (id, user_id, content)
        VALUES ($1, $2, $3)
        "#,
        brain_dump.id,
        brain_dump.user_id,
        brain_dump.content,
    )
    .execute(pool)
    .await
    .map_err(|e| DatabaseError(e.to_string()))?;
    Ok(())
}

/// Get brain dumps for a user with pagination
/// Omits deleted brain dumps
pub async fn get_brain_dumps(pool: &PgPool, query: &BrainDumpQuery) -> Result<(Vec<BrainDump>, u64), InfrastructureError> {
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
    .fetch_all(pool)
    .await
    .map_err(|e| DatabaseError(e.to_string()))?;

    let total_count: i64 = sqlx::query_scalar!(
        r#"
        SELECT COUNT(*)
        FROM brain_dumps
        WHERE user_id = $1 AND deleted_at IS NULL
        "#,
        query.user_id,
    )
    .fetch_one(pool)
    .await
    .map_err(|e| DatabaseError(e.to_string()))?
    .unwrap_or(0);

    Ok((brain_dumps, total_count as u64))
}

/// Delete brain dumps for a user by setting the deleted_at timestamp
/// Includes already deleted brain dumps
pub async fn delete_brain_dumps(pool: &PgPool, user_id: uuid::Uuid, dump_ids: &[uuid::Uuid]) -> Result<(), InfrastructureError> {
    sqlx::query!(
        r#"
        UPDATE brain_dumps
        SET deleted_at = NOW()
        WHERE user_id = $1 AND id = ANY($2)
        "#,
        user_id,
        dump_ids,
    )
    .execute(pool)
    .await
    .map_err(|e| DatabaseError(e.to_string()))?;
    Ok(())
}

/// Check if a user owns all the specified brain dumps
/// Crucially, dump_ids must be distinct
/// Includes already deleted brain dumps
pub async fn user_owns_brain_dumps(pool: &PgPool, user_id: uuid::Uuid, dump_ids: &[uuid::Uuid]) -> Result<bool, InfrastructureError> {
    let count: i64 = sqlx::query_scalar!(
        r#"
        SELECT COUNT(*)
        FROM brain_dumps
        WHERE user_id = $1 AND id = ANY($2)
        "#,
        user_id,
        dump_ids,
    )
    .fetch_one(pool)
    .await
    .map_err(|e| DatabaseError(e.to_string()))?
    .unwrap_or(0);

    Ok(count as usize == dump_ids.len())
}