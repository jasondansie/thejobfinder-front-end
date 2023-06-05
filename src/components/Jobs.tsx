import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeJobs } from '../features/jobs/jobsSlice';
import { RootState, AppDispatch } from '../app/store';
import JobCard from './JobCard';
import { IJobShort } from '../types';


const Jobs: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const jobsList = useSelector((state: RootState) => state.jobs.jobs);

  const loading = useSelector((state: RootState) => state.jobs.isLoading);

  useEffect(() => {
    dispatch(initializeJobs());
  }, [dispatch]);

  console.log('jobsList', jobsList);

  return (
    <div>
      <h1>Your Job List</h1>
      {jobsList.map((job: IJobShort) => (
        <JobCard
          key={job._id}
          company={job.company}
          Position={job.Position}
          jobDescription={job.jobDescription}
          applied={job.applied}
          _id={job._id}
        />
      ))}
    </div>
  );
};

export default Jobs;
