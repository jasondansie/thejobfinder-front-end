import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from '../features/jobs/jobsSlice';
import userReducer from '../features/users/userSlice';
import jobFormReducer from '../features/forms/jobFormSlice';

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    users: userReducer,
    jobForm: jobFormReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;