import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeJobs } from '../features/jobs/jobsSlice';
import { RootState, AppDispatch } from '../app/store';
import JobCard from './JobCard';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import CommonButton from './CommonButton';
import { IJobShort } from '../types';
import classes from './Jobs.module.css';

const Jobs: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const jobsList = useSelector((state: RootState) => state.jobs.jobs);
  const loading = useSelector((state: RootState) => state.jobs.isLoading);

  useEffect(() => {
    dispatch(initializeJobs());
  }, [dispatch]);

  return (
    <div>
      <Container className={classes.jobs}>
        <Row>
          <Col xs={6} md={8} className='pt-2'>
            <h1>Your Job List</h1>
          </Col>
          <Col xs={6} md={4} className="text-md-end">
            <CommonButton variant="primary" onClick={() => navigate("/addjob")}>
              Add Job
            </CommonButton>
          </Col>
        </Row>
      </Container>
      
      {loading ? (
        <h1>Loading.... ... ...</h1>
      ) : (
        jobsList.map((job: IJobShort) => (
          <JobCard
            key={job._id}
            company={job.company}
            Position={job.Position}
            jobDescription={job.jobDescription}
            dateApplied={job.dateApplied}
            response={job.response}
            _id={job._id}
          />
        ))
      )}
    </div>
  );
};

export default Jobs;
