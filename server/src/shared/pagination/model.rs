// Domain model for pagination
#[derive(Debug, Clone)]
pub struct OffsetPagination {
    pub offset: u32,
    pub limit: u32,
}