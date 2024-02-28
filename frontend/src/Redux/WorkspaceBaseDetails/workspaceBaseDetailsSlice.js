import { createSlice } from "@reduxjs/toolkit";

export const workspaceBaseDetailsSlice = createSlice({
    name:'user_select_workspace',
    initialState:{
        workspaceId:null,
        workspaceName:null,
        workspaceDescription:null,
        isPremium:false,
        create_on:null,
    },
    reducers:{
        set_selected_workspace:(state, action) => {
            state.workspaceId = action.payload.workspaceId;
            state.workspaceName = action.payload.workspaceName;
            state.workspaceDescription = action.payload.workspaceDescription; // Corrected payload to action.payload
            state.isPremium = action.payload.isPremium; // Corrected payload to action.payload
            state.create_on = action.payload.create_on; // Corrected payload to action.payload
        }
    }
});

export const { set_selected_workspace } = workspaceBaseDetailsSlice.actions;
export default workspaceBaseDetailsSlice.reducer;
