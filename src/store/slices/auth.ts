import { IUser } from "../../models/userModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeTokenFromLocalStorage, TokenType } from "../../utils/localStorage";
import { AppDispatch } from "../store";

export type AuthState = {
    user: IUser | null
    globalLoading: boolean
}

const initialState: AuthState = {
    user: null,
    globalLoading: true
};

const loginSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser(state, action: PayloadAction<IUser | null>) {
            state.user = action.payload;
        },
        setGlobalLoading(state, action: PayloadAction<boolean>) {
            state.globalLoading = action.payload;
        },
        setCurrentUserFirstName(state, action: PayloadAction<string>) {
            if(state.user){
                state.user.firstName = action.payload;
            }
        }
    }
});

export const logout = () =>
    async(dispatch: AppDispatch) => {
        removeTokenFromLocalStorage(TokenType.REFRESH);
        removeTokenFromLocalStorage(TokenType.ACCESS);
        dispatch(setAuthUser(null));
    };

export const {
    setAuthUser,
    setGlobalLoading,
    setCurrentUserFirstName
} = loginSlice.actions;

export default loginSlice.reducer;