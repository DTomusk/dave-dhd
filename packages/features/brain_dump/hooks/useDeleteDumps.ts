import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBrainDumps } from "../api/api";

export function useDeleteDumps() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (ids: string[]) => deleteBrainDumps(ids),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["brain-dumps"] });
        },
    });

    return mutation;
}