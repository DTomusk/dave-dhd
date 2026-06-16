import { api } from "../../../lib/api/api";
import type { LoginRequest, LoginResponse } from "../types";

// TODO: get rid of JSON.stringify
export const login = (input: LoginRequest) =>
    api.post<LoginResponse>("/auth/login", JSON.stringify(input));