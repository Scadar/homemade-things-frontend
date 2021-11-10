import { createApi, FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery, baseUrl } from "./config/query";
import { IGood } from "../models/goodModel";

export interface IGoodRequest extends IGood {
    images: File[];
}

export const goodsApi = createApi({
    reducerPath: "goodsAPI",
    baseQuery: baseQuery,
    tagTypes: ["GOODS"],
    endpoints: (build) => ({
        fetchCreateGood: build.mutation<IGood, IGoodRequest>({
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

                return result.data
                    ? { data: result.data as IGood }
                    : { error: result.error as FetchBaseQueryError };
            },
            invalidatesTags: ["GOODS"]
        }),
        fetchGetGoods: build.query<IGood[], void>({
            query: () => ({
                url: "/good",
                method: "GET"
            }),
            transformResponse(response: IGood[]) {
                return response.map(v => {
                    const result = { ...v };
                    result.goodImages =
                        result.goodImages
                            ?
                            result.goodImages.map(img => ({
                                ...img,
                                path: `${ baseUrl }/img/${ img.path }`
                            }))
                            :
                            [];
                    return result;
                });
            },
            providesTags: ["GOODS"]
        }),
        fetchDeleteGood: build.mutation<void, number>({
            query: (goodId) => ({
                url: `/good/${ goodId }`,
                method: "DELETE"
            }),
            invalidatesTags: ["GOODS"]
        })
    })
});