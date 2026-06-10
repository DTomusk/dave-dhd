export type RegistrationRequest = {
    username: string;
    password: string;
}

export type RegistrationResponse = {
    jwt: string;
}