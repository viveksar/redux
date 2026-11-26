import {configureStore} from '@reduxjs/toolkit'
import counterReducer from "../features/counter/counterslice"
import taskReducer from '../features/task/taskslick'
import productReducer from "../features/product/productslice"
import loggerMiddleware from '../middleware/loggermiddleware'

export const store=configureStore({
    reducer:{
        counter:counterReducer,
        tasks:taskReducer,
        products:productReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(loggerMiddleware)
})