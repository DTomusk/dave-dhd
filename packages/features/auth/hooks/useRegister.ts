import { useMutation } from "@tanstack/react-query";
import { register } from "../api/register";
import type { RegistrationRequest, RegistrationResponse } from "../types";
import type { ApiError } from "@davedhd/lib/api/error";

export function useRegister() {
    return useMutation<
        RegistrationResponse,
        ApiError,
        RegistrationRequest
    >({
        mutationFn: register,
    });
}