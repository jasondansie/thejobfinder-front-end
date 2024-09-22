import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { IJob } from '../types';
import classes from './Spinner.module.css'
import Card from 'react-bootstrap/Card';
import {Accordion, Col, Container, Row } from 'react-bootstrap';
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
        <Row className='mt-5'>
          <Col xs={12} md={4}>
            <div className="card">
              <div className="card-header">
                Job Info
              </div>
              <div className="card-body">
                <p className="card-text">Position: {jobListing.Position}</p>
                <p className="card-text">Company WebSite: <a href={jobListing.companyWebSite} aria-label="Go to Company Website" target="_blank" rel="noopener noreferrer"> {jobListing.company}</a></p>
                <p className="card-text">Application Link: <a href={jobListing.applicationLink} aria-label="Go to job link" target="_blank" rel="noopener noreferrer"> {jobListing.Position}</a> </p>
                <p className="card-text"> </p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4} >
            <div className="card">
              <div className="card-header">
                Application Info
              </div>
              <div className="card-body">
                <p className="card-text">Response: {jobListing.response}</p>
                <p className="card-text">Reason To Work Here: {jobListing.reasonToWork}</p>
                <p className="card-text">Date Applied: {jobListing.dateApplied}</p>
                <p className="card-text">Did You Apply: {applied}</p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4} >
            <div className="card">
              <div className="card-header">
                Recruiter Info
              </div>
              <div className="card-body">
                <p className="card-text">Recruiter Name: {jobListing.recruiterName}</p>
                <p className="card-text">Recruiter Position: {jobListing.recruiterPosition}</p>
                <p className="card-text">Recruiter Email: {jobListing.recruiterEmail}</p>
                <p className="card-text">Recruiter Phonenumber: {jobListing.recruiterPhonenumber}</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col xs={1} md={12}>
            <div className="card">
              <div className="card-header">
                Job Description and Notes
              </div>
              <div className="card-body">
                <Row>
                  <Col>
                    <Card.Text> 
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Job Description: </Accordion.Header>
                            <Accordion.Body>
                              {jobListing.jobDescription}
                            </Accordion.Body>
                          </Accordion.Item>
                      </Accordion>      
                    </Card.Text>   
                    <Card.Text> 
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>notes: </Accordion.Header>
                            <Accordion.Body>
                              {jobListing.notes}
                            </Accordion.Body>
                          </Accordion.Item>
                      </Accordion>      
                    </Card.Text>   
                  </Col>
                </Row>  
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ViewJob;
