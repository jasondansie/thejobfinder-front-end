import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogout } from '@react-oauth/google';
import { setAppUser, setIsLoggedIn, setUserslist } from '../features/users/userSlice';
import { AppDispatch, RootState } from '../app/store';
import { useNavigate } from 'react-router';
import checkLoginService from '../services/checkLogin';

const Profile = () => {
  const appUser = useSelector((state: RootState) => state.users.appUser);
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


  const logOut = () => {
    googleLogout();
    dispatch(setIsLoggedIn(false));
    dispatch(setAppUser(null));
    dispatch(setUserslist([]));
    localStorage.removeItem('authToken');
    localStorage.removeItem('localAppUser');
    navigate('/login');
  };

  return (
    <div>
      <img src={appUser?.picture} alt="user profile" />
      <h3>User Logged in</h3>
      <p>Name: {appUser?.name}</p>
      <p>Email Address: {appUser?.email}</p>
      <br />
      <br />
      <button onClick={logOut}>Log out</button>
    </div>
  );
};

export default Profile;
