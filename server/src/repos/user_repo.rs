use sqlx::PgPool;
use crate::{repos::errors::InfrastructureError, user::model::User};

pub async fn create_user(
    pool: &PgPool,
    user: &User,
) -> Result<(), InfrastructureError> {
    sqlx::query!(
        r#"INSERT INTO users (id, username, password_hash) VALUES ($1, $2, $3)"#,
        user.id,
        user.username,
        user.password_hash
    )
    .execute(pool)
    .await
    .map_err(|e| InfrastructureError::DatabaseError(e.to_string()))?;
    Ok(())
}
pub async fn get_user_by_username(
    pool: &PgPool,
    username: &str,
) -> Result<Option<User>, InfrastructureError> {
    // Eventually move to query_as!, but that requires connecting to db at compile
    let user = sqlx::query_as!(
        User,
        r#"SELECT id, username, password_hash FROM users WHERE username = $1"#,
        username
    )
    .fetch_optional(pool)
    .await
    .map_err(|e| InfrastructureError::DatabaseError(e.to_string()))?;
    Ok(user)
}