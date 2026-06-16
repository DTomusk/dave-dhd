import { useQuery } from "@tanstack/react-query";
import { getBrainDump } from "../api/api";

export function useBrainDumps(offset?: number, limit?: number) {
    const query = useQuery({
        queryKey: ["brain-dumps", offset, limit],
        queryFn: () => getBrainDump({ offset: offset ?? 0, limit: limit ?? 10 }),
    });
    return query;
}
    