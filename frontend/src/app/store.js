import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../feature/auth/authSlice';
import goalReducer from '../feature/goal/goalSlice';


export const store = configureStore({
    reducer : {
        auth: authReducer,
        goal: goalReducer
    }
})