import { createSlice } from "@reduxjs/toolkit";
import { ISendJob } from "../../types";

interface FormDataState {
    formData: ISendJob,
  }

export const jobFromSlice = createSlice({
    name: 'jobForm',
    initialState: {
        formData: {},
    } as FormDataState,
    reducers: {
        setFormData (state, action){
            state.formData = action.payload
        }
    }
});

export const {setFormData} = jobFromSlice.actions
export default jobFromSlice.reducer