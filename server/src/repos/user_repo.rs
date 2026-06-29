use sqlx::{Executor, Postgres};

use crate::{repos::errors::InfrastructureError, user::model::User};

pub async fn create_user<'e, E>(
    executor: E,
    user: &User,
) -> Result<(), InfrastructureError>
where
    E: Executor<'e, Database = Postgres>,
{
    sqlx::query!(
        r#"INSERT INTO users (id, username, password_hash) VALUES ($1, $2, $3)"#,
        user.id,
        user.username,
        user.password_hash
    )
    .execute(executor)
    .await
    .map_err(|e| InfrastructureError::DatabaseError(e.to_string()))?;
    Ok(())
}
pub async fn get_user_by_username<'e, E>(
    executor: E,
    username: &str,
) -> Result<Option<User>, InfrastructureError>
where
    E: Executor<'e, Database = Postgres>,
{
    let user = sqlx::query_as!(
        User,
        r#"SELECT id, username, password_hash FROM users WHERE username = $1"#,
        username
    )
    .fetch_optional(executor)
    .await
    .map_err(|e| InfrastructureError::DatabaseError(e.to_string()))?;
    Ok(user)
}