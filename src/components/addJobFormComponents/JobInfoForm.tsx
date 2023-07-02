import React from 'react';
import { IForm } from '../../types';
import { Form } from 'react-bootstrap';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../../features/forms/jobFormSlice';

const JobInfoForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const FormData = useSelector((state: RootState) => state.jobForm.formData)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
        const { name, value, type } = e.target;
        const fieldValue = type === 'checkbox' ? e.target.checked : value;
        dispatch(setFormData({ ...FormData, [name]: fieldValue }));
    };

    return (
        <Form>
            <Form.Group controlId="Position">
            <Form.Label>Position</Form.Label>
            <Form.Control
                type="text"
                name="Position"
                value={FormData.Position}
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Group controlId="jobDescription">
            <Form.Label>Job Description</Form.Label>
            <Form.Control
                type="text"
                name="jobDescription"
                value={FormData.jobDescription}
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Group controlId="reasonToWork">
            <Form.Label>Reason To Work at This Company</Form.Label>
            <Form.Control
                type="text"
                name="reasonToWork"
                value={FormData.reasonToWork}
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Group controlId="dateApplied">
            <Form.Label>Date Applied</Form.Label>
            <Form.Control
                type="text"
                name="dateApplied"
                value={FormData.dateApplied}
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Group controlId="notes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
                type="text"
                name="notes"
                value={FormData.notes}
                onChange={handleChange}
            />
            </Form.Group>
        </Form>
    );
};

export default JobInfoForm;