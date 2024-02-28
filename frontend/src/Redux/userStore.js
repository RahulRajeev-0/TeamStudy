import { configureStore } from '@reduxjs/toolkit';
import authenticationSliceReducer from './authentication/authenticationSlice';
import workspaceBaseDetailsSliceReducer from './workspaceBaseDetails/workspaceBaseDetailsSlice'; // Corrected naming

export default configureStore({
    reducer: {
        authenticationUser: authenticationSliceReducer, // Corrected naming
        user_workspace_select: workspaceBaseDetailsSliceReducer, // Corrected naming
    }
});
