import { configureStore } from '@reduxjs/toolkit';

// slices
import authenticationSliceReducer from './authentication/authenticationSlice';
import workspaceBaseDetailsSliceReducer from './workspaceBaseDetails/workspaceBaseDetailsSlice'; // Corrected naming
import WorkspaceUserProfileSliceReducer from './WorkspaceUserProfile/WorkspaceUserProfileSlice';


export default configureStore({
    reducer: {
        authenticationUser: authenticationSliceReducer, // Corrected naming
        user_workspace_select: workspaceBaseDetailsSliceReducer, // Corrected naming
        workspaceUserProfile:WorkspaceUserProfileSliceReducer,
    }
});
