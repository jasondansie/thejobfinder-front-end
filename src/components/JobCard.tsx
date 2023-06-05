import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IJobShort } from '../types';


const JobCard: React.FC<IJobShort> = ({ _id, company, Position, jobDescription }) => {
  return (
    <Card>
      <Card.Header>{Position}</Card.Header>
      <Card.Body>
        <Card.Title>{company}</Card.Title>
        <Card.Text>
          {jobDescription}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default JobCard;
