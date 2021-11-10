import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from "./config/query";
import { IUser } from "../models/userModel";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQuery,
    endpoints: (build) => ({
        fetchAddSellerRole: build.mutation<void, void>({
            query: () => ({
                url: `/roles/add-seller-role`,
                method: "POST"
            })
        }),
        fetchUpdateFirstname: build.mutation<IUser, { firstName: string }>({
            query: ({ firstName }) => ({
                url: `/user/first-name`,
                method: "PUT",
                body: { firstName }
            })
        }),
        fetchUpdateLastname: build.mutation<IUser, { lastName: string }>({
            query: ({ lastName }) => ({
                url: `/user/first-name`,
                method: "PUT",
                body: { lastName }
            })
        })
    })
});