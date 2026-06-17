import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrainDump } from "../api/api";

export function usePostDump() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (content: string) => createBrainDump(content),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["brain-dumps"] });
        },
    });

    return mutation;
}