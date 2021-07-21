// imports
import { useState, createContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({children}) =>
{
    const [user, setUser] = useState({});

    let url = 'https://prosolardata.herokuapp.com';

    const verifyUser = () =>
    {
        const userId = localStorage.getItem('userId');
        // console.log(userId);
        if (userId)
        {
            // choose between dev or prod url
            if (process.env.ENV === 'dev')
            {
                url = process.env.REACT_APP_BACKEND_URL;
            }

            axios.get(`${url}/user/verify`, {
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