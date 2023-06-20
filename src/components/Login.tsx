import React, { useEffect, useState } from 'react';
import { googleLogout, useGoogleLogin, TokenResponse } from '@react-oauth/google';
import axios from 'axios';
import { IUser } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { setUserslist, setAppUser, setIsLoggedIn } from '../features/users/userSlice';

interface RootState {
  users: {
    usersList: IUser[];
    appUser: IUser | null;
    isLoggedIn: boolean;
  };
}

interface IUser2 {
  id: string;
  name: string;
  email: string;
  givenName: string;
  familyName: string;
  picture: string;
}

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const userList = useSelector((state: RootState) => state.users.usersList);
  const isLoggedIn = useSelector((state: RootState) => state.users.isLoggedIn);
  const appUser = useSelector((state: RootState) => state.users.appUser);

  const [userListLocal, setUserListLocal] = useState<IUser[] | null>(null);

  console.log("userListLocal", userListLocal);


  // useEffect(() => {
  //   axios
  //     .get<IUser[]>("https://the-job-finder-back-end.onrender.com/api/v1/user")
  //     .then((res) => {
  //       dispatch(setUserslist(res.data));
  //       setUserListLocal(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [dispatch]);

  const getUserList = async () => {
    axios
      .get<IUser[]>("https://the-job-finder-back-end.onrender.com/api/v1/user")
      .then((res) => {
        dispatch(setUserslist(res.data));
        setUserListLocal(res.data);
      })
      .catch((err) => console.log(err));
  }

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
      checkIfIdExists(userProfile);
    } catch (error) {
      console.error('Error occurred while loading profile:', error);
    }
  };

  const checkIfIdExists = async (user: IUser) => {
    console.log("checking user:");

    try {
      console.log("userListLocal", userListLocal);
      if (userListLocal) {
        const isUser = userListLocal.find((foundUser) => foundUser.id === user.id);
        console.log("isUser:", isUser);

        if (isUser) {
          console.log("User found:", isUser);
        } else {
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
      getGoogleProfile(response);
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  const logOut = () => {
    googleLogout();
    dispatch(setIsLoggedIn(false));
    console.log("isLoggedIn", isLoggedIn);

    dispatch(setAppUser(null));
    dispatch(setUserslist([]));
    setUserListLocal([]);
    getUserList();

  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {isLoggedIn ? (
        <div>
          <img src={appUser?.picture} alt="user profile" />
          <h3>User Logged in</h3>
          <p>Name: {appUser?.name}</p>
          <p>Email Address: {appUser?.email}</p>
          <br />
          <br />
          <p>loggedIn = {isLoggedIn}</p>
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <div>
          <button onClick={() => login()}>Sign in with Google </button>
          <p>loggedIn = {isLoggedIn}</p>
        </div>
      )}
    </div>
  );
  
};

export default Login;
