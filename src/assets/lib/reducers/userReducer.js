import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { users } from "../placeholder-data";

export const userReducer = createSlice({
    name: 'user',
    initialState: {
        users: [],
        status: 'idle',
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'success';
                state.users = action.payload.rows.map(p => ({ ...p }))
            })
    }
})

export default userReducer.reducer;

export const fetchUsers = createAsyncThunk('user/fetchUsers', async data => {
    try {
        const response = await fetch('http://localhost:3000/users', {
            headers: { 'AuthToken': data }
        })
        const logData = await response.json()
        if (response.ok) return logData;
        throw new Error(response.statusText)
    } catch (err) {
        return Promise.reject(err.message ? err.message : data)
    }
})

export const findAuthorOfPost = (state, post) => {
    return state.userReducer.users.find(u => u.id == post.userID)
}