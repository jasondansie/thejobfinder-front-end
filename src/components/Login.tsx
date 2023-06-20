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
  const navigate = useNavigate()
  const [userListLocal, setUserListLocal] = useState<IUser[] | null>(null);

  useEffect(() => {
    axios
      .get<IUser[]>("https://the-job-finder-back-end.onrender.com/api/v1/user")
      .then((res) => {
        dispatch(setUserslist(res.data));
        setUserListLocal(res.data);
      })
      .catch((err) => console.log(err));
  }, [dispatch]);


  const getUserList = async () => {
    try {
      const response = await axios.get<IUser[]>("https://the-job-finder-back-end.onrender.com/api/v1/user");
      dispatch(setUserslist(response.data));
      console.log("setUserListLocal", response.data);
      setUserListLocal(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const addUser = async (user: IUser) => {
    try {
      const response = await axios.post(
        "https://the-job-finder-back-end.onrender.com/api/v1/user",
        { user }
      );
      if (response && response.data && response.data.message) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const getGoogleProfile = async (tokenResponse: TokenResponse) => {
    try {
      const response = await axios.get<IUser>(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
          Accept: 'application/json'
        }
      });
      const userProfile = response.data;
      console.log("User profile:", userProfile);
      dispatch(setAppUser(userProfile));
      await checkIfIdExists(userProfile);
    } catch (error) {
      console.error('Error occurred while loading profile:', error);
    }
  };

  const checkIfIdExists = async (user: IUser) => {
    getUserList();
    console.log("checking user:");

    try {
      console.log("userListLocal", userListLocal);
      if (userListLocal) {
        const isUser = userListLocal.find((foundUser) => foundUser.id === user.id.toString());
        console.log("isUser:", isUser);

        if (isUser) {
          console.log("User found:", isUser);
        } else {
          console.log("adding user");
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
      getUserList();
      console.log("isLoggedIn", isLoggedIn);
      console.log("Getting profile");
      getGoogleProfile(response);
      navigate('/profile');
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />   
        <div>
          <button onClick={() => login()}>Sign in with Google </button>
        </div>
    </div>
  );
  
};

export default Login;
