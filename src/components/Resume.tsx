import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import checkLoginService from '../services/checkLogin';
import { useNavigate } from 'react-router';

const Resume = () => {
    const isLoggedIn = useSelector((state: RootState) => state.users.isLoggedIn);
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

    return (
        <div>
           <h1>Resume</h1> 
        </div>
    );
};

export default Resume;