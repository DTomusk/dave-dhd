import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getBrainDumps } from "../api/api";

export function usePagedDumps(offset?: number, limit?: number) {
    const query = useQuery({
        queryKey: ["brain-dumps", offset, limit],
        queryFn: () => getBrainDumps({ offset: offset ?? 0, limit: limit ?? 10 }),
    });
    return query;
}
    
export function useInfiniteDumps(limit = 10) {
    const query = useInfiniteQuery({
        queryKey: ["brain-dumps", "infinite", limit],
        initialPageParam: 0,
        queryFn: ({ pageParam = 0 }) => getBrainDumps({ offset: pageParam, limit }),
        getNextPageParam: (lastPage) => {
            const nextOffset = lastPage.offset + lastPage.limit;
            return nextOffset < lastPage.total ? nextOffset : undefined;
        }
    })
    return query;
}