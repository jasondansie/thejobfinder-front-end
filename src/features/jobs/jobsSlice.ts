import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jobsService from '../../services/jobs';

interface JobsState {
  jobs: Job[];
  isLoading: boolean;
}

interface Job {
  // Define your job properties here
}

export const initializeJobs = createAsyncThunk(
  'jobs/initialize',
  async (_, { dispatch }) => {
    try {
      const jobs = await jobsService.getall();
      dispatch(getjobs(jobs));
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error initializing jobs:', error);
      // Handle error accordingly
    }
  }
);

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    isLoading: true,
  } as JobsState,
  reducers: {
    getjobs(state, action) {
      state.jobs = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    }
  }   
});

export const { getjobs, setLoading } = jobsSlice.actions;
export default jobsSlice.reducer;
