import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { IJob } from '../types';
import classes from './Spinner.module.css'
import { Col, Container, Row } from 'react-bootstrap';
import CommonButton from './CommonButton';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import checkLoginService from '../services/checkLogin';

const ViewJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const baseurl = `https://the-job-finder-back-end.onrender.com/api/v1/jobs/${id}`;
  const [jobListing, setJobListing] = useState<IJob | null>(null);
  const isLoggedIn = useSelector((state: RootState) => state.users.isLoggedIn);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  let applied = "no";

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
    const fetchData = async () => {
      try {
        const response = await axios.get(baseurl);
        setJobListing(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  }, [baseurl]);

  if (!jobListing) {
    return <div className={classes.ldsellipsis}><h4>Loading </h4><div></div><div></div><div></div><div></div></div>
  }

  if (jobListing?.applied) {
      applied = "yes";  
  }

  return (
    <Container className={classes.jobs}>
      <div>
      <Row>
          <Col xs={6} md={3} className='pt-2'>
            <h1>{jobListing.company}</h1>
          </Col>
          <Col xs={6} md={2} className="text-md-end">
            <CommonButton variant="primary" onClick={() => navigate(`/joblist`)}>
              Back to list
            </CommonButton>
          </Col>
          <Col xs={6} md={2} className="text-md-end">
            <CommonButton variant="primary" onClick={() => navigate(`/editjob/${jobListing._id}`)}>
              Edit Job
            </CommonButton>
          </Col>
        </Row>
        <div>
          <p>Position: {jobListing.Position}</p>
          <p>Company WebSite: <a href={jobListing.companyWebSite} aria-label="Go to Company Website" target="_blank" rel="noopener noreferrer"> {jobListing.company}</a> </p>
          <p>Application Link: <a href={jobListing.applicationLink} aria-label="Go to job link" target="_blank" rel="noopener noreferrer"> {jobListing.Position}</a> </p>
          <p>Response: {jobListing.response}</p>
          <p>Reason To Work Here: {jobListing.reasonToWork}</p>
          <p>Recruiter Name: {jobListing.recruiterName}</p>
          <p>Recruiter Position: {jobListing.recruiterPosition}</p>
          <p>Recruiter Email: {jobListing.recruiterEmail}</p>
          <p>Recruiter Phonenumber: {jobListing.recruiterPhonenumber}</p>
          <p>Date Applied: {jobListing.dateApplied}</p>
          <p>Did You Apply: {applied}</p>
          <p>notes: {jobListing.notes}</p>
          <p>Job Description: {jobListing.jobDescription}</p>
        </div>
      </div>
    </Container>

    
  );
};

export default ViewJob;
