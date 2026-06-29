use validator::ValidationError;

pub fn validate_not_blank(content: &str) -> Result<(), ValidationError> {
    if content.trim().is_empty() {
        return Err(ValidationError::new("content cannot be blank"));
    }
    Ok(())
}