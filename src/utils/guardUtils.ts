import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";

export const isFetchBaseQueryErrorType = (error: any): error is FetchBaseQueryError => 'status' in error