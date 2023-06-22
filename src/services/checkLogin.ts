import { Dispatch } from 'redux';
import { AnyAction } from "@reduxjs/toolkit";
import { setAppUser, setIsLoggedIn } from "../features/users/userSlice";
import { NavigateFunction } from 'react-router';


const checkIfLoggedIn = (dispatch: Dispatch<AnyAction>, navigate: NavigateFunction) => {

    const storedUser = localStorage.getItem('localAppUser');
    if (storedUser) {
        try {
            dispatch(setAppUser(JSON.parse(storedUser)));
            dispatch(setIsLoggedIn(true));
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
}


const checkLoginService = { checkIfLoggedIn };

export default checkLoginService