import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { ISendJob } from '../../types';
import { setFormData } from '../../features/forms/jobFormSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';

interface FormInfoProps {
  userId: string;
}

const CompanyInfoForm: React.FC<FormInfoProps> = ({ userId }) => {
  const dispatch: AppDispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.jobForm.formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? e.target.checked : value;
    dispatch(setFormData({ ...formData, [name]: fieldValue }));
  };

  // useEffect(() => {
  //   // Initialize formData with userId
  //   dispatch(setFormData({ ...formData, userId: userId }));

  //   // Cleanup function to remove the effect
  //   return () => {
  //     // Reset formData when the component unmounts
  //     dispatch(setFormData({}));
  //   };
  // }, []); // Empty dependency array ensures the effect runs only once on mount and unmount

  return (
    <Form>
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
      </div>
    </Form>
  );
};

export default CompanyInfoForm;
