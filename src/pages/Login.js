// imports
import axios from 'axios';

// contexts
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Login = () =>
{
    // contexts
    const { userState } = useContext(UserContext);
    
    // states
    const [ user, setUser ] = userState;
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    // variables
    let url = 'https://prosolardata.herokuapp.com';

    // functions
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        // check for empty fields
        if (email === "" || password === "")
        {
            // clear messages
            document.querySelector(".messages").innerHTML = null;
            if (email === "")
            {
                // grab email input
                const emailInput = document.querySelector("#email");
                // add invalid class
                emailInput.classList.add("invalid");
                // create invalid message
                const message = document.createElement("p");
                message.innerHTML = "Email is required";
                message.style.color = "red";
                // add message
                document.querySelector(".messages").append(message);
            }
            if (password === "")
            {
                // grab password input
                const passwordInput = document.querySelector("#password");
                // add invalid class
                passwordInput.classList.add("invalid");
                // create invalid message
                const message = document.createElement("p");
                message.innerHTML = "Password is required";
                message.style.color = "red";
                // add message
                document.querySelector(".messages").append(message);
            }
            return;
        }

        // choose between dev or prod url
        if (process.env.ENV !== 'dev')
        {
            url = process.env.REACT_APP_BACKEND_URL;
        }

        axios.post(`${url}/user/login`, {
            email: email,
            password: password
        }).then((res) =>
        {
            // console.log(res);
            setUser(res.data.user);
            localStorage.setItem('userId', res.data.user.id);
        }).catch((error) =>
        {
            console.log(error.message);
            // check for unauthorized message - incorrect password
            if (error.message === 'Request failed with status code 401')
            {
                // clear messages
                document.querySelector(".messages").innerHTML = null;
                // create invalid message
                const message = document.createElement("p");
                message.innerHTML = "Incorrect password";
                message.style.color = "red";
                // add message
                document.querySelector(".messages").append(message);
            }
            // check for could not be found message - incorrect email
            else if (error.message === 'Request failed with status code 404')
            {
                // clear messages
                document.querySelector(".messages").innerHTML = null;
                // create invalid message
                const message = document.createElement("p");
                message.innerHTML = "Incorrect email";
                message.style.color = "red";
                // add message
                document.querySelector(".messages").append(message);
            }
        })
    }

    return (
        <div className="login-page">
            <h2 className="heading">Login</h2>
            <p className="messages"></p>
            <form onSubmit={handleSubmit}>
                <div className="login-form">
                    <div className="login-labels">
                        <label htmlFor="email">Email</label>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="login-inputs">
                        <input id="email" type="text" value={email} placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                        <input id="password" type="password" value={password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                </div>
            </form>
            <input type="submit" value="Login" onClick={handleSubmit}/>
        </div>
    )
}

export default Login;