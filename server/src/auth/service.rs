use sqlx::PgPool;

use super::{
    errors::AuthError, 
    jwt,
    model::{RegisterUserCommand, LoginUserCommand}, 
    password::{hash_password, verify_password},
};
use crate::repos::user_repo;
use crate::user::model::User;

pub struct AuthService {
    pool: PgPool,
    jwt_secret: String,
    jwt_expiration_minutes: i64,
}

impl AuthService {
    pub fn new(
        pool: PgPool, 
        jwt_secret: String, 
        jwt_expiration_minutes: i64,
    ) -> Self {
        Self { pool, jwt_secret, jwt_expiration_minutes }
    }
    
    pub async fn register_user(
        &self,
        command: RegisterUserCommand,
    ) -> Result<String, AuthError> {
        // auth hashes password, checks if username is in use, persists user and generates token
        let existing_user = user_repo::get_user_by_username(&self.pool, &command.username)
            .await
            .map_err(|e| AuthError::RepositoryError(e))?;
        if existing_user.is_some() {
            return Err(AuthError::UserAlreadyExists);
        }
        let user = User::new(
            command.username.clone(), 
            hash_password(&command.password),
        );
        user_repo::create_user(&self.pool, &user)
            .await
            .map_err(|e| AuthError::RepositoryError(e))?;
        
        let token = crate::auth::jwt::generate_token(
            &user.id.to_string(), 
            &self.jwt_secret, 
            self.jwt_expiration_minutes,
        ).map_err(|e| AuthError::TokenGenerationError(e))?;
        Ok(token)
    }
    pub async fn login_user(
        &self,
        command: LoginUserCommand,
    ) -> Result<String, AuthError> {
        let user = user_repo::get_user_by_username(&self.pool, &command.username)
            .await
            .map_err(|e| AuthError::RepositoryError(e))?
            .ok_or(AuthError::InvalidCredentials)?;
        
        if !verify_password(&command.password, &user.password_hash) {
            return Err(AuthError::InvalidCredentials);
        }

        let token = jwt::generate_token(
            &user.id.to_string(), 
            &self.jwt_secret, 
            self.jwt_expiration_minutes,
        ).map_err(|e| AuthError::TokenGenerationError(e))?;
        Ok(token)
    }

    pub fn verify_token(&self, token: &str) -> Result<crate::auth::model::Claims, AuthError> {
        jwt::verify_jwt(token, &self.jwt_secret)
            .map_err(|_| AuthError::Unauthorized)
    }
}