import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';


const initialState = {
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    goals: [],
    formData: null
}

export const getAllGoal = createAsyncThunk(
    "goal/getall",
    async (_, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await goalService.getAllGoal(token)
        } catch (err) {
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getByIdGoal = createAsyncThunk(
    "goal/getById",
    async (id, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await goalService.getById(id, token)
        } catch (err) {
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const createdGoal = createAsyncThunk(
    "goal/create",
    async (goal, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await goalService.createGoal(goal, token)
        } catch (err) {
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const updateGoal = createAsyncThunk(
    "goal/update",
    async (goal, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await goalService.updateGoal(goal, token)
        } catch (err) {
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const deleteGoal = createAsyncThunk(
    "goal/delete",
    async (id, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await goalService.deleteGoal(id, token)
        } catch (err) {
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)
const goalSlice = createSlice({
    name: 'goal',

    initialState,

    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.customerName ="";
            state.feedback = ""
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllGoal.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = ""
            })
            .addCase(getAllGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message
                state.goals = action.payload
            })
            .addCase(getAllGoal.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || action.error.message
            })


            .addCase(getByIdGoal.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = ""
            })
            .addCase(getByIdGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.formData = action.payload;
            })
            .addCase(getByIdGoal.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || action.error.message
            })


            .addCase(createdGoal.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = ""
            })
            .addCase(createdGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message
            })

            .addCase(createdGoal.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || action.error.message
            })

            .addCase(updateGoal.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = ""
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || action.error.message
            })

            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = ""
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || action.error.message
            })
    }
})

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;