export type BrainDumpResponse = {
    id: string;
    content: string;
    created_at: string;
}

export type BrainDumpDeleteRequest = {
    ids: string[];
}