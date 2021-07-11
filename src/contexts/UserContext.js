// imports
import { useState, createContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({children}) =>
{
    const [user, setUser] = useState({});

    const verifyUser = () =>
    {
        const userId = localStorage.getItem('userId');
        // console.log(userId);
        if (userId)
        {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}user/verify`, {
                headers: { Authorization: userId }
            }).then((res) =>
            {
                // console.log(res);
                if(res.data.user)
                {
                    setUser(res.data.user);
                }
            }).catch((error) =>
            {
                console.log(error.message);
            })
        }
    }

    const state = {
        userState: [user, setUser],
        verifyUser: verifyUser
    };

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}