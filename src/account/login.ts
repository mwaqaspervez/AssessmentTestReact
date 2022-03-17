import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit"
import httpRequest from "../config/HttpRequest";

const LOGIN_USER = 'LOGIN/LOGIN_USER';

type LoginRequest = {
    username: string;
    password: string;
}

type LoginResponse = {
    user: {
        role: string;
    }
    isLoggedIn: boolean;
}

export const loginUserAction = createAsyncThunk(
    LOGIN_USER,
    async (payload: LoginRequest) => loginUser(payload)
)

function loginUser(values: LoginRequest): Promise<LoginResponse> {
    const url = `/login`;
    try {
        return httpRequest.request({
            url,
            method: 'POST',
            data: {
                ...values
            }
        });
    } catch (error) {
        return Promise.reject("Invalid username and password")
    }
}

const initialState: {
    user: {
        isLoggedIn: boolean,
        role: string | null;
    }, loading: boolean, error?: SerializedError, success: boolean
} = {
    user: {
        isLoggedIn: false,
        role: null,
    },
    loading: false,
    error: undefined,
    success: false
};

const slice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUserAction.fulfilled, (state) => {
            state.user.isLoggedIn = true;
            state.loading = false;
            state.error = undefined;
        }).addCase(loginUserAction.pending, (state) => {
            state.user.isLoggedIn = false
            state.loading = true;
            state.error = undefined;
        }).addCase(loginUserAction.rejected, (state, action) => {
            state.user.isLoggedIn = false;
            state.loading = false;
            state.error = action.error;
        });
    }
})

export default slice.reducer;