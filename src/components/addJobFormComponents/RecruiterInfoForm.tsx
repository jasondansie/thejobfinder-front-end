import React from 'react';
import { IForm } from '../../types';
import { Form } from 'react-bootstrap';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../../features/forms/jobFormSlice';

const RecruiterInfoForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const FormData = useSelector((state: RootState) => state.jobForm.formData)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
      const { name, value, type } = e.target;
      const fieldValue = type === 'checkbox' ? e.target.checked : value;
      dispatch(setFormData({ ...FormData, [name]: fieldValue }));
  };

  return (
      <Form>
          <Form.Group controlId="recruiterName">
          <Form.Label>Recruiter's Name</Form.Label>
          <Form.Control
              type="text"
              name="recruiterName"
              value={FormData.recruiterName}
              onChange={handleChange}
          />
          </Form.Group>
          <Form.Group controlId="recruiterEmail">
          <Form.Label>Recruiter's Email</Form.Label>
          <Form.Control
              type="text"
              name="recruiterEmail"
              value={FormData.recruiterEmail}
              onChange={handleChange}
          />
          </Form.Group>
          <Form.Group controlId="recruiterPhonenumber">
          <Form.Label>Recruiter's Phonenumber</Form.Label>
          <Form.Control
              type="text"
              name="recruiterPhonenumber"
              value={FormData.recruiterPhonenumber}
              onChange={handleChange}
          />
          </Form.Group>
          <Form.Group controlId="recruiterPosition">
          <Form.Label>Recruiter's Position</Form.Label>
          <Form.Control
              type="text"
              name="recruiterPosition"
              value={FormData.recruiterPosition}
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
            checked={FormData.applied === true}
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            id="applied-no"
            name="applied"
            value="false"
            label="No"
            checked={FormData.applied === false}
            onChange={handleChange}
          />
        </div>
      </Form.Group>
      </Form>
  );
};

export default RecruiterInfoForm;