use crate::{brain_dump::model::{BrainDump, BrainDumpDeleteCommand, BrainDumpQuery}, repos::brain_dump_repo::BrainDumpRepo};

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

    pub async fn delete_brain_dumps(&self, command: &BrainDumpDeleteCommand) -> Result<(), sqlx::Error> {
        // Get all distinct ids to delete
        // Ensure user owns all dumps (doesn't matter if they're already deleted)
        // Set deleted at for all dumps 
        Ok(())
    }
}