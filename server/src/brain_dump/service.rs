use sqlx::PgPool;

use crate::{brain_dump::{
    errors::BrainDumpError, 
    model::{
        BrainDump, 
        BrainDumpDeleteCommand, 
        BrainDumpQuery,
    }, 
}, repos::brain_dump_repo};

pub struct BrainDumpService {
    pool: PgPool,
}

impl BrainDumpService {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }

    pub async fn insert_brain_dump(&self, brain_dump: &BrainDump) -> Result<(), BrainDumpError> {
        brain_dump_repo::insert_brain_dump(&self.pool, brain_dump)
            .await
            .map_err(|e| BrainDumpError::RepositoryError(e))
    }

    pub async fn get_brain_dumps(&self, query: &BrainDumpQuery) -> Result<(Vec<BrainDump>, u64), BrainDumpError> {
        brain_dump_repo::get_brain_dumps(&self.pool, query)
            .await
            .map_err(|e| BrainDumpError::RepositoryError(e))
    }

    pub async fn delete_brain_dumps(&self, command: &BrainDumpDeleteCommand) -> Result<(), BrainDumpError> {
        // Ensure user owns all dumps (doesn't matter if they're already deleted)
        let owns_all = brain_dump_repo::user_owns_brain_dumps(&self.pool, command.user_id, &command.dump_ids)
        .await
        .map_err(|e| BrainDumpError::RepositoryError(e))?;
    
        if !owns_all {
            return Err(BrainDumpError::NotFound("brain dumps not found".to_string()));
        }

        // Set deleted at for all dumps 
        brain_dump_repo::delete_brain_dumps(&self.pool, command.user_id, &command.dump_ids)
        .await
        .map_err(|e| BrainDumpError::RepositoryError(e))?;
        Ok(())
    }
}