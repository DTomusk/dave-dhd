use serde::{Deserialize, Serialize};

//const DEFAULT_LIMIT: u32 = 20;
const MAX_LIMIT: u32 = 100;

#[derive(Debug, Deserialize, Clone, Copy)]
pub struct OffsetPaginationQuery {
    pub offset: u32,
    pub limit: u32,
}

impl OffsetPaginationQuery {
    pub fn normalise(offset: u32, limit: u32) -> Self {
        Self {
            offset,
            limit: limit.min(MAX_LIMIT),
        }
    }
}

#[derive(Debug, Serialize)]
pub struct OffsetPaginationResponse<T> {
    pub items: Vec<T>,
    pub total: u64,
    pub offset: u32,
    pub limit: u32,
}

impl<T> OffsetPaginationResponse<T> {
    pub fn new(items: Vec<T>, total: u64, offset: u32, limit: u32) -> Self {
        Self {
            items,
            total,
            offset,
            limit,
        }
    }
}