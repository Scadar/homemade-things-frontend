import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { DeviceInfo, ILoginResponse, IUser } from "../models/userModel";
import { logout, setAuthUser, setGlobalLoading } from "../store/slices/auth";
import { getTokenFromLocalStorage, setTokenToLocalStorage, TokenType } from "../utils/localStorage";
import { baseQuery } from "./config/query";

export const authApi = createApi({
    reducerPath: "authAPI",
    baseQuery: baseQuery,
    endpoints: (build) => ({
        fetchLogin: build.mutation<IUser, { email: string, password: string, deviceInfo: DeviceInfo }>({
            query: ({ email, password, deviceInfo }) => ({
                url: "/auth/login",
                method: "POST",
                body: { email, password, deviceInfo }
            }),
            transformResponse(response: ILoginResponse) {
                setTokenToLocalStorage(TokenType.ACCESS, response.accessToken);
                setTokenToLocalStorage(TokenType.REFRESH, response.refreshToken);
                return parseJwt<IUser>(response.accessToken);
            },
            async onQueryStarted(arg, api) {
                try {
                    const { data } = await api.queryFulfilled;
                    api.dispatch(setAuthUser(data));
                } catch (e) {
                    api.dispatch(setAuthUser(null));
                }
            }
        }),
        fetchProfile: build.query<void, void>({
            query: () => ({
                url: "/user/me",
                method: "GET"
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const accessToken = getTokenFromLocalStorage(TokenType.ACCESS);
                if (!accessToken) {
                    dispatch(setGlobalLoading(false));
                    return;
                }

                dispatch(setGlobalLoading(true));
                try {
                    await queryFulfilled;
                    const user = parseJwt<IUser>(accessToken);
                    dispatch(setAuthUser(user));
                } catch (e) {
                    dispatch(logout());
                } finally {
                    dispatch(setGlobalLoading(false));
                }
            }
        }),
        fetchRegister: build.mutation<void, { email: string, password: string, registerAsAdmin: boolean, username: string }>({
            query: ({ email, password, registerAsAdmin, username }) => ({
                url: "/auth/register",
                method: "POST",
                body: { email, password, registerAsAdmin, username }
            })
        })
    })
});

export const parseJwt = <T>(token: string): T => {

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+")
                            .replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(atob(base64)
    .split("")
    .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0)
                              .toString(16)).slice(-2);
    })
    .join(""));

    return JSON.parse(jsonPayload);
};