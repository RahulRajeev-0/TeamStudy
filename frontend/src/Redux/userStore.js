import {configureStore} from '@reduxjs/toolkit';
import authenticationSliceReducer from './authentication/authenticationSlice';

export default configureStore({
    reducer: {
        authentication_user:authenticationSliceReducer,
    }
})