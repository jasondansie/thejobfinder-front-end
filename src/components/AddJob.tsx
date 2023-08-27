import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { useNavigate } from 'react-router';
import checkLoginService from '../services/checkLogin';
import classes from './AddJob.module.css'
import CompanyInfoForm from './addJobFormComponents/CompanyInfoForm';
import JobInfoForm from './addJobFormComponents/JobInfoForm';
import RecruiterInfoForm from './addJobFormComponents/RecruiterInfoForm';
import { ISendJob } from '../types';
import { setFormData } from '../features/forms/jobFormSlice';

const AddJob: React.FC = () => {
  const baseurl = `https://the-job-finder-back-end.onrender.com/api/v1/jobs`;

  const appUser = useSelector((state: RootState) => state.users.appUser);
  const isLoggedIn = useSelector((state: RootState) => state.users.isLoggedIn);
  const jobFormData = useSelector((state: RootState) => state.jobForm.formData);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

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


  let userId = "";

  if (appUser) {
    userId = appUser.id;
  }


  const [steps, setSteps] = useState([
    {
      key: "firstStep",
      label: "Add Company Info",
      isDone: true,
      component: <CompanyInfoForm
        userId={userId}
      />
    },
    {
      key: "secondStep",
      label: "Add Job Info",
      isDone: false,
      component: <JobInfoForm />,
    },
    {
      key: "finalStep",
      label: "Add Recruiter Info",
      isDone: false,
      component: <RecruiterInfoForm/>,
    },
  ]);
  const [activeStep, setActiveStep] = useState(steps[0]);

  const handleNext = async() => {
    const index = steps.findIndex((x) => x.key === activeStep.key);
    if (index < steps.length - 1) {
      setActiveStep(steps[index + 1]);
    } else {
      if (steps[steps.length - 1].key === activeStep.key) {   
        try {
          
          const formDataWithUserId: ISendJob = {
            ...jobFormData,
            userId: userId,
          };

          console.log("jobFormData",jobFormData);

          const response = await axios.post(baseurl, formDataWithUserId);

          if (response && response.data && response.data.message) {
            dispatch(setFormData([]));
            navigate('/jobList');
          }
        } catch (error) {
          console.error('An error occurred:', error);
          console.log('An error occurred:', error);
        }
      } else {
        alert("You have completed all steps.");
      }
    }
  };

  const handleBack = () => {
    const index = steps.findIndex((x) => x.key === activeStep.key);
    if (index > 0) {
      setActiveStep(steps[index - 1]);
    } else if (index === 0) {
      navigate("/SendForm");
    }
  };
     
  return (
    <div>
      <h1>Add a Job</h1>
      <div className={classes.createForm_container}>
        <div className={classes.box}>
          <div className={classes.steps}>
            <ul className="nav">
              {steps.map((step, i) => (
                <li
                  key={i}
                  className={`${
                    activeStep.key === step.key ? classes.active : ""
                  } ${step.isDone ? classes.done : ""}`}
                >
                  <div>
                    {"Step"} {i + 1}
                    <br />
                    <span>{(`${step.label}`)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.step_component}>{activeStep.component}</div>
          <div className={classes.btn_component}> 
            <Button
                type="button"
                variant="secondary"
                onClick={handleBack}
                disabled={steps[0].key === activeStep.key}
              >
                {"Back"}
            </Button>
            <Button type="button" onClick={handleNext} variant="primary">
              {steps[steps.length - 1].key !== activeStep.key
                ? "Next"
                : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob;