import React from 'react';
import Card from 'react-bootstrap/Card';
import { IJobShort } from '../types';
import CommonButton from './CommonButton';
import { useNavigate } from 'react-router';
import { Accordion, Col, Container, Row } from 'react-bootstrap';
import classes  from './JobCard.module.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { setLoading } from '../features/jobs/jobsSlice';


const JobCard: React.FC<IJobShort> = ({ _id, company, Position, jobDescription, dateApplied, response }) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const linkWithId = `/viewjob/${_id}`;
  const baseurl = `https://the-job-finder-back-end.onrender.com/api/v1/jobs`;

  const deletJob = async() => {
    console.log("deleting job");
    dispatch(setLoading(true)) ;
    await axios.delete(`${baseurl}/${_id}`);
    dispatch(setLoading(false)) ;
  }

  return (
    <Container className={classes.cardContainer}>
      <Row>
        <Card>
      <Card.Header>{Position}</Card.Header>
      <Card.Body>
        <Card.Title className='mb-2 ms-1'>{company}</Card.Title>
        <Row>
          <Col xs={6} md={5} className='mb-2 '>
            <Card.Text>
              Date applied: 
            </Card.Text> 
          </Col>
          <Col xs={6} md={5}> 
          {dateApplied}
          </Col>
          <Col> 
          </Col>
        </Row>
        <Row>
          <Col xs={6} className='mb-3 ms-1' md={5}>
            <Card.Text>
            Company Response: 
            </Card.Text> 
          </Col>
          <Col xs={5} md={5}>
          {response}
          </Col>
          <Col> 
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Text> 
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{Position} job listing: </Accordion.Header>
                    <Accordion.Body>
                      {jobDescription}
                    </Accordion.Body>
                  </Accordion.Item>
              </Accordion>      
            </Card.Text>   
          </Col>
        </Row>      
        <Row>
          <Col xs={6} md={10} className='pt-2'>
            <div>
              <CommonButton variant="secondary" onClick={() => navigate(linkWithId)}>
                  {"View"}
              </CommonButton>
            </div>
          </Col >
            
          <Col xs={6} md={2} className='ml-3 pt-2'>
            <CommonButton variant="secondary" onClick={deletJob}>
                {"Remove"}
            </CommonButton>
          </Col>
        </Row>            
      </Card.Body>
        </Card>
      </Row>
    </Container>
    
    
  );
};

export default JobCard;
