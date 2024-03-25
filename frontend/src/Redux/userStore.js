import { configureStore } from '@reduxjs/toolkit';

// slices
import authenticationSliceReducer from './authentication/authenticationSlice';
import workspaceBaseDetailsSliceReducer from './workspaceBaseDetails/workspaceBaseDetailsSlice'; // Corrected naming
import WorkspaceUserProfileSliceReducer from './WorkspaceUserProfile/WorkspaceUserProfileSlice';
import GroupSliceReducer from './WorkspaceGroup/GroupSlice';

export default configureStore({
    reducer: {
        authenticationUser: authenticationSliceReducer, // Corrected naming
        user_workspace_select: workspaceBaseDetailsSliceReducer, // Corrected naming
        workspaceUserProfile:WorkspaceUserProfileSliceReducer,
        user_select_group:GroupSliceReducer,
    }
});
