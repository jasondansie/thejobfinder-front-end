import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, RootState } from '../types';
import { googleLogout } from '@react-oauth/google';
import { setAppUser, setIsLoggedIn, setUserslist } from '../features/users/userSlice';
import { AppDispatch } from '../app/store';
import { useNavigate } from 'react-router';


const Profile = () => {
    const appUser = useSelector((state: RootState) => state.users.appUser);
    const dispatch: AppDispatch = useDispatch();
    const [userListLocal, setUserListLocal] = useState<IUser[] | null>(null);
    const navigate = useNavigate();

    const logOut = () => {
        googleLogout();
        dispatch(setIsLoggedIn(false));
        dispatch(setAppUser(null));
        dispatch(setUserslist([]));
        setUserListLocal([]);
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