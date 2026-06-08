use serde::{Deserialize, Serialize};
use utoipa::{IntoParams, ToSchema};

const DEFAULT_LIMIT: u32 = 20;
const MAX_LIMIT: u32 = 100;

#[derive(Debug, Deserialize, Clone, Copy, IntoParams)]
#[into_params(parameter_in = Query)]
pub struct OffsetPaginationQuery {
    #[param(default = 0, required = false)]
    pub offset: Option<u32>,
    #[param(default = 20, required = false)]
    pub limit: Option<u32>,
}

#[derive(Debug, Clone, Copy)]
pub struct NormalisedOffsetPaginationQuery {
    pub offset: u32,
    pub limit: u32,
}

impl OffsetPaginationQuery {
    pub fn normalise(&self) -> NormalisedOffsetPaginationQuery {
        NormalisedOffsetPaginationQuery {
            offset: self.offset.unwrap_or(0),
            limit: self.limit.unwrap_or(DEFAULT_LIMIT).min(MAX_LIMIT),
        }
    }
}

#[derive(Debug, Serialize, ToSchema)]
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