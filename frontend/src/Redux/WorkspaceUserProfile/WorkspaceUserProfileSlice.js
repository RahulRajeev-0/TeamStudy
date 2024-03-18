import {createSlice} from "@reduxjs/toolkit";

export const workspaceUserProfileSlice = createSlice(
    {
        name:'workspace_user_profile',
        initialState:{
            displayName:null,
            phoneNo:null,
            isAdmin:null,
            aboutMe:null,
            profilePic:null,
        },
        reducers: {
            set_display_name: (state, action) => {
                state.displayName = action.payload;
              },
              set_phone_no: (state, action) => {
                state.phoneNo = action.payload;
              },
              set_is_admin: (state, action) => {
                state.isAdmin = action.payload;
              },
              set_about_me: (state, action) => {
                state.aboutMe = action.payload;
              },
              set_profile_pic: (state, action) => {
                state.profilePic = action.payload;
              },
        }

        
    }
);

export const { set_display_name, set_phone_no, set_is_admin, set_about_me, set_profile_pic } = workspaceUserProfileSlice.actions;

export default workspaceUserProfileSlice.reducer;