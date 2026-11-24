import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}


export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkApi) => {
        try {
            return await authService.register(user)
        }
        catch (err) {
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkApi) => {
        try {
            return await authService.login(user)
        }
        catch (err) {
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',

    initialState,

    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = ""
        },

        logout: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            localStorage.removeItem("user")
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = ""
        })
        .addCase(register.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload.message
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action)=>{
            state.user = null;
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload || action.error.message
        })

        .addCase(login.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = ""
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload.message
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action)=>{
            state.user = null;
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload || action.error.message
        })
     }
})

export const { reset, logout } = authSlice.actions
export default authSlice.reducer;