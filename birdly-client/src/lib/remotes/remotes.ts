import { request } from "./request";


export const remote = {
    register: (name: string, email:string, password: string) =>
        request({
            method: "POST",
            route: "/api/v0.1/auth/register",
            body: { name, email, password },
        }),

    login: (email: string, password: string) =>
        request({
            method: "POST",
            route: "/api/v0.1/auth/login",
            body: { email, password },
        }),

    me: () =>
        request({
            method: "GET",
            route: "/api/v0.1/auth/me",
            auth: true,
        }),

    logout: () =>
        request({
            method: "POST",
            route: "/api/v0.1/auth/logout",
            auth: true,
        }),
}
