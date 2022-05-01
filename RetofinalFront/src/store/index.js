import { configureStore } from '@reduxjs/toolkit'
import formState from './slices/formState'

export default configureStore({
    reducer:{
        formState
    }
})
