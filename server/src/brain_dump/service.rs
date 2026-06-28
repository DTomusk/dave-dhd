use crate::{brain_dump::{errors::BrainDumpError, model::{BrainDump, BrainDumpDeleteCommand, BrainDumpQuery}}, repos::brain_dump_repo::BrainDumpRepo};

pub struct BrainDumpService {
    pub brain_dump_repo: BrainDumpRepo,
}

impl BrainDumpService {
    pub fn new(brain_dump_repo: BrainDumpRepo) -> Self {
        Self { brain_dump_repo }
    }

    pub async fn insert_brain_dump(&self, brain_dump: &BrainDump) -> Result<(), sqlx::Error> {
        self.brain_dump_repo.insert_brain_dump(brain_dump).await
    }

    pub async fn get_brain_dumps(&self, query: &BrainDumpQuery) -> Result<(Vec<BrainDump>, u64), sqlx::Error> {
        self.brain_dump_repo.get_brain_dumps(query).await
    }

    pub async fn delete_brain_dumps(&self, command: &BrainDumpDeleteCommand) -> Result<(), BrainDumpError> {
        // Ensure user owns all dumps (doesn't matter if they're already deleted)
        let owns_all = self.brain_dump_repo
            .user_owns_brain_dumps(command.user_id, &command.dump_ids)
            .await?;
        if !owns_all {
            // TODO: don't let user know that they have the ids of dumps that exist but don't belong to them
            // But would be good to log that someone tried deleting another person's dumps
            return Err(BrainDumpError::NotFound("brain dumps not found".to_string()));
        }
        // Set deleted at for all dumps 
        self.brain_dump_repo
            .delete_brain_dumps(command.user_id, &command.dump_ids)
            .await?;
        Ok(())
    }
}