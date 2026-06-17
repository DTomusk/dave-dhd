import { api } from "@davedhd/lib/api/api";
import type { RegistrationRequest, RegistrationResponse } from "../types";

// TODO: get rid of JSON.stringify
export const register = (input: RegistrationRequest) =>
    api.post<RegistrationResponse>("/auth/register", JSON.stringify(input));