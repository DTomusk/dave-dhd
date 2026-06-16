export type PaginatedRequest = {
    offset?: number;
    limit?: number;
}

export type PaginatedResponse<T> = {
    items: T[];
    total: number;
    offset: number;
    limit: number;
}