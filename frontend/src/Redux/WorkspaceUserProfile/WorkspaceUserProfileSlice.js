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
            setDisplayName: (state, action) => {
                state.displayName = action.payload;
              },
              setPhoneNo: (state, action) => {
                state.phoneNo = action.payload;
              },
              setIsAdmin: (state, action) => {
                state.isAdmin = action.payload;
              },
              setAboutMe: (state, action) => {
                state.aboutMe = action.payload;
              },
              setProfilePic: (state, action) => {
                state.profilePic = action.payload;
              },
        }

        
    }
);

export const { setDisplayName, setPhoneNo, setIsAdmin, setAboutMe, setProfilePic } = workspaceUserProfileSlice.actions;

export default workspaceUserProfileSlice.reducer;