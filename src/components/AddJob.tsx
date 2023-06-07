import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { ISendJob } from '../types';

const AddJob: React.FC = () => {
    const baseurl = `https://the-job-finder-back-end.onrender.com/api/v1/jobs`;

    const [formData, setFormData] = useState<ISendJob>({
        company: '',
        companyWebSite: '',
        applicationLink: '',
        Position: '',
        jobDescription: '',
        dateApplied: '',
        response: '',
        reasonToWork: '',
        recruiterName: '',
        recruiterPosition: '',
        applied: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        const fieldValue = type === 'checkbox' ? e.target.checked : value;
        setFormData({ ...formData, [name]: fieldValue });
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("formData",formData);
        try {
          const response = await axios.post(baseurl, formData);
          // Handle successful job addition
          if (response && response.data && response.data.message) {
            console.log(response.data.message); // Success message from the server
            // Show a success message to the user or perform any other action
          }
        } catch (error) {
          console.error('An error occurred:', error);
          // Handle error, e.g., show an error message
        }
      };

  return (
    <div>
      <h1>Add a Job</h1>
      
      <Form onSubmit={handleSubmit}>
        <div>
            <Form.Group controlId="company">
            <Form.Label>Company</Form.Label>
            <Form.Control
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Group controlId="companyWebSite">
            <Form.Label>Company WebSite</Form.Label>
            <Form.Control
                type="text"
                name="companyWebSite"
                value={formData.companyWebSite}
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Group controlId="applicationLink">
            <Form.Label>Application Link</Form.Label>
            <Form.Control
                type="text"
                name="applicationLink"
                value={formData.applicationLink}
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Group controlId="Position">
            <Form.Label>Position</Form.Label>
            <Form.Control
                type="text"
                name="Position"
                value={formData.Position}
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Group controlId="jobDescription">
            <Form.Label>Job Description</Form.Label>
            <Form.Control
                type="text"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Group controlId="dateApplied">
            <Form.Label>Date Applied</Form.Label>
            <Form.Control
                type="text"
                name="dateApplied"
                value={formData.dateApplied}
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Group controlId="response">
            <Form.Label>Response</Form.Label>
            <Form.Control
                type="text"
                name="response"
                value={formData.response}
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Group controlId="reasonToWork">
            <Form.Label>Reason To Work at This Company</Form.Label>
            <Form.Control
                type="text"
                name="reasonToWork"
                value={formData.reasonToWork}
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Group controlId="recruiterName">
            <Form.Label>Recruiter's Name</Form.Label>
            <Form.Control
                type="text"
                name="recruiterName"
                value={formData.recruiterName}
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Group controlId="recruiterPosition">
            <Form.Label>Recruiter's Position</Form.Label>
            <Form.Control
                type="text"
                name="recruiterPosition"
                value={formData.recruiterPosition}
                onChange={handleChange}
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
              checked={formData.applied === true}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              id="applied-no"
              name="applied"
              value="false"
              label="No"
              checked={formData.applied === false}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        </div>
        <Button variant="primary" type="submit">
          Add Job
        </Button>
      </Form>
    </div>
  );
};

export default AddJob;