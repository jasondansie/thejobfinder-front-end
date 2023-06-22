import React, { useEffect, useState } from 'react';
import { useGoogleLogin, TokenResponse } from '@react-oauth/google';
import axios from 'axios';
import { IUser } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { setUserslist, setAppUser, setIsLoggedIn } from '../features/users/userSlice';
import { useNavigate } from 'react-router';

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.users.isLoggedIn);
  const navigate = useNavigate();
  const [userListLocal, setUserListLocal] = useState<IUser[] | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken'); // Retrieve the authentication token from localStorage
    if (storedToken) {
      // If the token exists, the user is already logged in
      dispatch(setIsLoggedIn(true));
      getUserList();
      getGoogleProfile({ access_token: storedToken }); // Simulate getting user profile with the token
      navigate('/profile');
    } else {
      // The user is not logged in
      dispatch(setIsLoggedIn(false));
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    axios
      .get<IUser[]>('https://the-job-finder-back-end.onrender.com/api/v1/user')
      .then((res) => {
        dispatch(setUserslist(res.data));
        setUserListLocal(res.data);
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const storeAuthToken = (token: string) => {
    localStorage.setItem('authToken', token); // Store the authentication token in localStorage
  };

  const removeAuthToken = () => {
    localStorage.removeItem('authToken'); // Remove the authentication token from localStorage
  };

  const getUserList = async () => {
    try {
      const response = await axios.get<IUser[]>('https://the-job-finder-back-end.onrender.com/api/v1/user');
      dispatch(setUserslist(response.data));
      setUserListLocal(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async (user: IUser) => {
    try {
      const response = await axios.post('https://the-job-finder-back-end.onrender.com/api/v1/user', { user });
      if (response && response.data && response.data.message) {
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const getGoogleProfile = async (tokenResponse: { access_token: string }) => {
    try {
      const response = await axios.get<IUser>(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
            Accept: 'application/json',
          },
        }
      );
      const userProfile = response.data;
      dispatch(setAppUser(userProfile));
      localStorage.setItem("localAppUser", JSON.stringify(response.data));
      await checkIfIdExists(userProfile);
    } catch (error) {
      console.error('Error occurred while loading profile:', error);
    }
  };
  

  const checkIfIdExists = async (user: IUser) => {
    getUserList();

    try {
      if (userListLocal) {
        const isUser = userListLocal.find((foundUser) => foundUser.id === user.id.toString());

        if (!isUser) {     
          await addUser(user);
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (response: TokenResponse) => {
      dispatch(setIsLoggedIn(true));
      storeAuthToken(response.access_token); // Store the authentication token
      getUserList();
      getGoogleProfile(response);
      navigate('/profile');
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  const logout = () => {
    dispatch(setIsLoggedIn(false));
    removeAuthToken(); // Remove the authentication token
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      <div>
        {isLoggedIn ? (
          <button onClick={logout}>Sign out</button>
        ) : (
          <button onClick={() => login()}>Sign in with Google</button>
        )}
      </div>
    </div>
  );
};

export default Login;
