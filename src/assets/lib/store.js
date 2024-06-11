import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/postReducer";
import userReducer from "./reducers/userReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
    postReducer,
    userReducer,
    authReducer
})

export const store = configureStore({
    reducer: rootReducer
})