import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import checkLoginService from '../services/checkLogin';
import { useNavigate } from 'react-router';
import Jobs from './Jobs';


const InterviewTips = () => {
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
      <h1>Interview Tips</h1>
    </div>
    );
};

export default InterviewTips;