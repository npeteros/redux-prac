import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../client";
import postReducer from "./postReducer";

export const authReducer = createSlice({
    name: "auth",
    initialState: {
        user: {},
        token: '',
        status: 'idle',
        error: null
    },
    reducers: {
        signOut: (state, action) => {
            state.token = '';
            state.user = {};
        }
    },
    extraReducers: builder => {
        builder
            .addCase(logIn.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.status = 'success';
                state.token = action.payload;
                state.user = action.payload.user;
            })
            .addCase(logIn.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload
            })
            .addCase(signUp.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload
            })
            .addCase(validateAuth.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(validateAuth.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload
            })
    }
})

export const {
    signOut
} = authReducer.actions;

export default authReducer.reducer;

export const logIn = createAsyncThunk('auth/logIn', async data => {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const logData = await response.json()
        if (response.ok) return logData;
        throw new Error(response.statusText)
    } catch (err) {
        return Promise.reject(err.message ? err.message : data)
    }
})

export const signUp = createAsyncThunk('auth/signUp', async data => {
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const logData = await response.json()
        if (response.ok) return logData;
        throw new Error(response.statusText)
    } catch (error) {
        return Promise.reject(err.message ? err.message : data)
    }
})

export const validateAuth = createAsyncThunk('auth/validate', async data => {
    try {
        const response = await fetch('http://localhost:3000/validate', {
            headers: { 'AuthToken': data }
        })
        const logData = await response.json()
        if (response.ok) return logData;
        throw new Error(response.statusText)
    } catch (err) {
        return Promise.reject(err.message ? err.message : data)
    }
})