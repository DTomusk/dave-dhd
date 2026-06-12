import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";
import type { LoginRequest, LoginResponse } from "../types";
import type { ApiError } from "../../../lib/api/error";

export function useLogin() {
    return useMutation<
        LoginResponse,
        ApiError,
        LoginRequest
    >({
        mutationFn: login,
    });
}