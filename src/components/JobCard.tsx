import React from 'react';
import Card from 'react-bootstrap/Card';
import { IJobShort } from '../types';
import CommonButton from './CommonButton';
import { useNavigate } from 'react-router';
import { Accordion, Col, Container, Row } from 'react-bootstrap';
import classes  from './JobCard.module.css'


const JobCard: React.FC<IJobShort> = ({ _id, company, Position, jobDescription, dateApplied, response }) => {
  const navigate = useNavigate();
  const linkWithId = `/viewjob/${_id}`
  return (
    <Container className={classes.cardContainer}>
      <Row>
        <Card>
      <Card.Header>{Position}</Card.Header>
      <Card.Body>
        <Card.Title className='mb-2 ms-1'>{company}</Card.Title>
        <Row>
          <Col xs={6} md={5} className='mb-2 ms-1'>
            <Card.Text>
              Date applied: 
            </Card.Text> 
          </Col>
          <Col xs={5} md={5}> 
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
          <Col>
            <CommonButton variant="secondary" onClick={() => navigate(linkWithId)}>
                {"View Job"}
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
