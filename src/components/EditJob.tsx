import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { IJob } from '../types';
import { Container, Form, Button } from 'react-bootstrap';

const EditJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const baseurl = `https://the-job-finder-back-end.onrender.com/api/v1/jobs/${id}`;
  const [jobListing, setJobListing] = useState<IJob | null>(null);
  const navigate = useNavigate();

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        console.log("sending edit");
      await axios.post(baseurl, jobListing);
      navigate(`/viewjob/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobListing((prevJobListing: IJob | null) => ({
      ...(prevJobListing as IJob),
      [name]: value
    }));
  };

  if (!jobListing) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>Edit Job</h1>
      <Form onSubmit={handleFormSubmit}>
        <div>
            <Form.Group controlId="company">
            <Form.Label>Company</Form.Label>
            <Form.Control
                type="text"
                name="company"
                value={jobListing.company}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Form.Group controlId="companyWebSite">
            <Form.Label>Company WebSite</Form.Label>
            <Form.Control
                type="text"
                name="companyWebSite"
                value={jobListing.companyWebSite}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Form.Group controlId="applicationLink">
            <Form.Label>Application Link</Form.Label>
            <Form.Control
                type="text"
                name="applicationLink"
                value={jobListing.applicationLink}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Form.Group controlId="Position">
            <Form.Label>Position</Form.Label>
            <Form.Control
                type="text"
                name="Position"
                value={jobListing.Position}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Form.Group controlId="jobDescription">
            <Form.Label>Job Description</Form.Label>
            <Form.Control
                type="text"
                name="jobDescription"
                value={jobListing.jobDescription}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Form.Group controlId="notes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
                type="text"
                name="notes"
                value={jobListing.notes}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Form.Group controlId="dateApplied">
            <Form.Label>Date Applied</Form.Label>
            <Form.Control
                type="text"
                name="dateApplied"
                value={jobListing.dateApplied}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Form.Group controlId="response">
            <Form.Label>Response</Form.Label>
            <Form.Control
                type="text"
                name="response"
                value={jobListing.response}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Form.Group controlId="reasonToWork">
            <Form.Label>Reason To Work at This Company</Form.Label>
            <Form.Control
                type="text"
                name="reasonToWork"
                value={jobListing.reasonToWork}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Form.Group controlId="recruiterName">
            <Form.Label>Recruiter's Name</Form.Label>
            <Form.Control
                type="text"
                name="recruiterName"
                value={jobListing.recruiterName}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Form.Group controlId="recruiterEmail">
            <Form.Label>Recruiter's Email</Form.Label>
            <Form.Control
                type="text"
                name="recruiterEmail"
                value={jobListing.recruiterEmail}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Form.Group controlId="recruiterPhonenumber">
            <Form.Label>Recruiter's Phonenumber</Form.Label>
            <Form.Control
                type="text"
                name="recruiterPhonenumber"
                value={jobListing.recruiterPhonenumber}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Form.Group controlId="recruiterPosition">
            <Form.Label>Recruiter's Position</Form.Label>
            <Form.Control
                type="text"
                name="recruiterPosition"
                value={jobListing.recruiterPosition}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Form.Group controlId="applied">
          <Form.Label>Did you Apply?</Form.Label>
          <div>
            <Form.Check
              type="radio"
              id="applied-yes"
              name="applied"
              value="true"
              label="Yes"
              checked={jobListing.applied === true}
              onChange={handleInputChange}
            />
            <Form.Check
              type="radio"
              id="applied-no"
              name="applied"
              value="false"
              label="No"
              checked={jobListing.applied === false}
              onChange={handleInputChange}
            />
          </div>
        </Form.Group>
        </div>
        <Button variant="primary" type="submit">
            Update Job
        </Button>
      </Form>
    </Container>
  );
};

export default EditJob;
