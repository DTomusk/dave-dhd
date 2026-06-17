import { api } from "@davedhd/lib/api/api";
import type { PaginatedRequest, PaginatedResponse } from "@davedhd/lib/types";
import type { BrainDumpResponse } from "../types";

export function getBrainDump(input: PaginatedRequest) {
    return api.get<PaginatedResponse<BrainDumpResponse>>(`/brain-dump?offset=${input.offset ?? 0}&limit=${input.limit ?? 10}`);
}

export function createBrainDump(content: string) {
    return api.post("/brain-dump", JSON.stringify({ content }));
}