import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeJobs } from '../features/jobs/jobsSlice';
import { RootState, AppDispatch } from '../app/store';
import NavMenu from './NavMenu';


const Jobs = () => {

    const dispatch: AppDispatch = useDispatch();

    const jobsList = useSelector((state: RootState) => state.jobs.jobs)
    
    const loading = useSelector((state: RootState) => state.jobs.isLoading)
    
    
    useEffect(() => {
      dispatch(initializeJobs())
      
    }, [dispatch])

    console.log("jobsList", jobsList);

    return (
        <div>
            Hello from Jobs
        </div>
    );
};

export default Jobs;