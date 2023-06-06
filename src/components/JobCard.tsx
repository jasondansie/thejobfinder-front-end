import React from 'react';
import Card from 'react-bootstrap/Card';
import { IJobShort } from '../types';
import CommonButton from './CommonButton';
import { useNavigate } from 'react-router';


const JobCard: React.FC<IJobShort> = ({ _id, company, Position, jobDescription }) => {
  const navigate = useNavigate();
  const linkWithId = `/viewjob/${_id}`
  return (
    <Card>
      <Card.Header>{Position}</Card.Header>
      <Card.Body>
        <Card.Title>{company}</Card.Title>
        <Card.Text>
          {jobDescription}
        </Card.Text>
          <CommonButton variant="secondary" onClick={() => navigate(linkWithId)}>
              {"View Job"}
          </CommonButton>
      </Card.Body>
    </Card>
  );
};

export default JobCard;
