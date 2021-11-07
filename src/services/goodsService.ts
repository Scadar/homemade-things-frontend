import { createApi, FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from "./config/query";
import { IGood } from "../models/goodModel";

export interface IGoodRequest extends IGood {
    images: File[];
}

export interface IGoodResponse {
    id: number;
    title: string;
    price: number;
    discount: number;
    description: string;
    specifications: string[];
}

export const goodsApi = createApi({
    reducerPath: "goodsAPI",
    baseQuery: baseQuery,
    endpoints: (build) => ({
        fetchCreateGood: build.mutation<IGoodResponse, IGoodRequest>({
            queryFn: async({ title, images, specifications, discount, price, description },
                           api,
                           extraOptions,
                           baseQuery1
            ) => {

                let formData = new FormData();
                formData.append("title", title);
                formData.append("price", price.toString());
                formData.append("discount", discount.toString());
                formData.append("description", description.toString());
                specifications.forEach(s => {
                    formData.append("specifications", s.title + ":" + s.value);
                });
                images.forEach(i => {
                    formData.append("images", i);
                });
                const result = await baseQuery1({
                    url: "/good",
                    method: "POST",
                    body: formData
                });

                console.log(result);

                return result.data
                    ? { data: result.data as IGoodResponse }
                    : { error: result.error as FetchBaseQueryError };
            }
        })
    })
});