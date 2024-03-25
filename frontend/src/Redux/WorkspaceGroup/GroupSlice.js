import { createSlice } from "@reduxjs/toolkit";

export const GroupSlice = createSlice({
    name:'user_select_group',
    initialState:{
        id:null,
        name:null,
        topic:null,
        description:null,
        is_private:false,

    },
    reducers:{
        set_selected_group:(state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.description = action.payload.description; // Corrected payload to action.payload
            state.is_private = action.payload.is_private; // Corrected payload to action.payload
            state.topic = action.payload.topic; // Corrected payload to action.payload
            
        }
    }
});

export const { set_selected_group } = GroupSlice.actions;
export default GroupSlice.reducer;
