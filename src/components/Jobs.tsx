import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeJobs } from '../features/jobs/jobsSlice';
import {AppDispatch, RootState } from '../app/store';

import JobCard from './JobCard';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import CommonButton from './CommonButton';
import { IJob, IJobShort } from '../types';
import classes from './Jobs.module.css';
import checkLoginService from '../services/checkLogin';

const Jobs: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const jobsList = useSelector((state: RootState) => state.jobs.jobs);
  const loading = useSelector((state: RootState) => state.jobs.isLoading);
  const appUser = useSelector((state: RootState) => state.users.appUser);
  const isLoggedIn = useSelector((state: RootState) => state.users.isLoggedIn);
  const totalJobs = jobsList.length;
  const rejectedJobs = jobsList.filter((job) => job.response === "Rejected");
  const unasweredJobs = jobsList.filter((job) => job.response === "");
  const answeredJobs = totalJobs - (unasweredJobs.length + rejectedJobs.length);


  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('1');

  useEffect(() => {
    if (!isLoggedIn) {
        console.log("isLoggedIn", isLoggedIn);
        navigate('/login');
    }

    try {
    checkLoginService.checkIfLoggedIn(dispatch, navigate);
    } catch (error) {
    console.error('Error parsing user data:', error);
    }
  }, [dispatch, navigate, isLoggedIn]);


  useEffect(() => {
    dispatch(initializeJobs());
  }, [dispatch]);

  let usersJobs: IJob[] = [];

  if (appUser) {
    usersJobs = jobsList.filter((job) => job.userId === appUser.id.toString());
  }
  else{
    console.log("appUser not loaded");
  }

  const filteredJobs = usersJobs.filter((job: IJobShort) => {
    const matchSearchQuery = job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.Position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobDescription.toLowerCase().includes(searchQuery.toLowerCase());

    const matchFilter = filterValue === 'none' || job.response === filterValue;

    return matchSearchQuery && matchFilter;
  });

  const handleSearch = () => {
    // Perform the search action here
  };

  return (
    <div>
      <Container className={classes.jobs}>
        <Row>
          <Col xs={7} md={3} className='pt-2'>
            <h1>Your Job List</h1>
          </Col>
          <Col xs={5} md={2} className="text-md-end">
            <CommonButton variant="primary" onClick={() => navigate("/addjob")}>
              Add Job
            </CommonButton>
          </Col>
        </Row>
        <Row className='mb-3' justify-content-md-center>
          <Col xs={1} md={2}></Col>
          <Col xs={5} md={2} >
            Total jobs: {totalJobs}
          </Col>
          <Col xs={6} md={2}>
            Rejections: {rejectedJobs.length}
          </Col>
          <Col xs={6} md={2}>
            Unanswered: {unasweredJobs.length}
          </Col>
          <Col xs={6} md={3}>
            Answered: {answeredJobs}
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col xs={12} md={4} className='pt-2'>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-success" onClick={() => handleSearch()}>Search</Button>
            </Form>
          </Col>
          <Col xs={12} md={4} className='pt-2'>
            <InputGroup>
              <InputGroup.Text id="inputGroup-sizing-lg">Filter by:</InputGroup.Text>
              <Form.Select aria-label="Default select example" value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
                  <option value="none">none</option>
                  <option value="Internship">Internship</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Rejected">Rejected</option>
                  <option value="">No Response</option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>
      </Container>

      {loading ? (
        <div className={classes.ldsellipsis}><h4>Loading </h4><div></div><div></div><div></div><div></div></div>
      ) : (
        <Container className={classes.jobs}>
          <Row>
            <Col>
              {
                filteredJobs.map((job: IJobShort) => (
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
              }
            </Col>
        </Row>
        </Container>
      )}
    </div>
  );
};

export default Jobs;
