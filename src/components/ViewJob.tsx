import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { IJob } from '../types';
import classes from './Spinner.module.css'

const ViewJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const baseurl = `https://the-job-finder-back-end.onrender.com/api/v1/jobs/${id}`;
  const [jobListing, setJobListing] = useState<IJob | null>(null);
  let applied = "no";

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

  if (!jobListing) {
    return <div className={classes.ldsellipsis}><h4>Loading </h4><div></div><div></div><div></div><div></div></div>
  }

  if (jobListing?.applied) {
      applied = "yes";  
  }

  return (
    <div>
      <h1>View current Job</h1>
      <div>
        <h3>{jobListing.company}</h3>
        <p>Position: {jobListing.Position}</p>
        <p>Company WebSite: <a href={jobListing.companyWebSite} aria-label="Go to Company Website" target="_blank" rel="noopener noreferrer"> {jobListing.company}</a> </p>
        <p>Application Link: <a href={jobListing.applicationLink} aria-label="Go to job link" target="_blank" rel="noopener noreferrer"> {jobListing.Position}</a> </p>
        <p>Response: {jobListing.response}</p>
        <p>Reason To Work Here: {jobListing.reasonToWork}</p>
        <p>Recruiter Name: {jobListing.recruiterName}</p>
        <p>Recruiter Position: {jobListing.recruiterPosition}</p>
        <p>Recruiter Email: {jobListing.recruiterEmail}</p>
        <p>Recruiter Phonenumber: {jobListing.recruiterPhonenumber}</p>
        <p>Date Applied: {jobListing.dateApplied}</p>
        <p>Did You Apply: {applied}</p>
        <p>notes: {jobListing.notes}</p>
        <p>Job Description: {jobListing.jobDescription}</p>
      </div>
    </div>
  );
};

export default ViewJob;
