use sqlx::PgPool;
use crate::user::model::User;

pub struct UserRepo {
    pub db: PgPool
}

// TODO: repo currently returns sqlx::Error
// should map to an error type the domain layer can use 
// otherwise domain layer has to know about sqlx
impl UserRepo {
    pub fn new(db: PgPool) -> Self {
        Self { db }
    }
    pub async fn create_user(
        &self,
        user: &User,
    ) -> Result<(), sqlx::Error> {
        sqlx::query!(
            r#"INSERT INTO users (id, username, password_hash) VALUES ($1, $2, $3)"#,
            user.id,
            user.username,
            user.password_hash
        )
        .execute(&self.db)
        .await?;
        Ok(())
    }
    pub async fn get_user_by_username(
        &self,
        username: &str,
    ) -> Result<Option<User>, sqlx::Error> {
        // Eventually move to query_as!, but that requires connecting to db at compile
        let user = sqlx::query_as!(
            User,
            r#"SELECT id, username, password_hash FROM users WHERE username = $1"#,
            username
        )
        .fetch_optional(&self.db)
        .await?;
        Ok(user)
    }
}