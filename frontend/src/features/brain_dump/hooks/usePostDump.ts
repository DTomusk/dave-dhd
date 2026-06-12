import { useMutation } from "@tanstack/react-query";
import { createBrainDump } from "../api/api";

export function usePostDump() {
    const mutation = useMutation({
        mutationFn: (content: string) => createBrainDump(content),
    });
    return mutation;
}