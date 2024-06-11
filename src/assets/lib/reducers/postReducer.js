import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../client";
import { posts } from "../placeholder-data";

export const postReducer = createSlice({
    name: "post",
    initialState: {
        posts: [],
        status: "idle",
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'success';
                state.posts = action.payload.rows.map(p => ({ ...p }))
            })
            .addCase(addPost.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.status = 'success';
                console.log(action.payload);
                state.posts.push(action.payload)
            })
            .addCase(addPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = 'success';
                state.posts = state.posts.filter(p => p.id != action.payload.id)
            })
    }
})

export default postReducer.reducer;

export const fetchPosts = createAsyncThunk('post/fetchPosts', async data => {
    try {
        const response = await fetch('http://localhost:3000/posts', {
            headers: { 'AuthToken': data }
        })
        const logData = await response.json()
        if (response.ok) return logData;
        throw new Error(response.statusText)
    } catch (err) {
        return Promise.reject(err.message ? err.message : data)
    }
})

export const addPost = createAsyncThunk('posts/addPost', async data => {
    try {
        const newData = {
            post: data.data,
            user: data.user
        }

        const response = await fetch('http://localhost:3000/posts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'AuthToken': data.token
            },
            body: JSON.stringify(newData)
        })
        const logData = await response.json()
        if (response.ok) return logData;
        throw new Error(response.statusText)
    } catch (error) {
        return Promise.reject(err.message ? err.message : data)
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async data => {
    try {
        const response = await fetch('http://localhost:3000/posts', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'AuthToken': data.token
            },
            body: JSON.stringify(data)
        })
        const logData = await response.json();
        if (response.ok) return logData;
        throw new Error(response.statusText)
    } catch (error) {
        return Promise.reject(err.message ? err.message : data);        
    }
})