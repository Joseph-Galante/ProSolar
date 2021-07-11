// imports
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// pages
import Login from './Login';

// contexts
import { UserContext } from '../contexts/UserContext';
import { NavContext } from '../contexts/NavContext';

const Tesla = () =>
{
    // contexts
    const { userState } = useContext(UserContext);
    const [ user, setUser ] = userState;
    const { navState } = useContext(NavContext);
    const [ nav, setNav ] = navState;

    // states
    const [ editing, setEditing ] = useState(false);
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    // functions
    const logout = () =>
    {
        localStorage.removeItem('userId');
        setUser({});
    }

    const editInfo = () =>
    {
        // check for empty fields
        if (name === "" || email === "" || password === "")
        {
            // clear messages
            document.querySelector(".messages").innerHTML = null;
            if (name === "")
            {
                // grab name input
                const nameInput = document.querySelector("#name");
                // add invalid class
                nameInput.classList.add("invalid");
                // create invalid message
                const message = document.createElement("p");
                message.innerHTML = "Name is required";
                message.style.color = "red";
                // add message
                document.querySelector(".messages").append(message);
            }
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
        axios.put(`${process.env.REACT_APP_BACKEND_URL}user/profile`, {
            name: name,
            email: email,
            password: password
        }, { headers: { Authorization: user.id }
        }).then(res =>
        {
            // console.log(res);
            setUser(res.data.user);
            localStorage.setItem('userId', res.data.user.id);
            setEditing(false);
        }).catch(error => console.log(error.message));
    }

    // on component load
    useEffect(() => {setNav("#tesla")}, []);

    return (
        <div className="tesla-page">
            {user.id ?
                <>
                    <h3>Profile Info</h3>
                    <p className="messages"></p>
                    <section className="user-info">
                        <section className="labels">
                            <p>Name</p>
                            <p>Email</p>
                            <p>Password</p>
                        </section>
                        {editing ?
                            <section className="edit-info">
                                <input id="name" type="text" placeholder="Name" value={name} onChange={(e) => {setName(e.target.value)}} />
                                <input id="email" type="text" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                                <input id="password" type="text" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                            </section>
                            :
                            <section className="info">
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                                <p>{user.password}</p>
                            </section>
                        }
                    </section>
                    {editing ?
                        <section className="edit-inputs">
                            <input type="button" value="Cancel" onClick={() => {document.querySelector(".messages").innerHTML = null; setEditing(false)}} />
                            <input type="button" value="Save" onClick={editInfo} />
                        </section>
                        :
                        <section className="inputs">
                            <input type="button" value="Edit Info" onClick={() => {setName(user.name); setEmail(user.email); setPassword(user.password); setEditing(true)}} />
                            <input type="button" value="Log Out" onClick={logout} />
                        </section>
                    }
                    <br/>
                    <section className="home-units">
                        <h2>HOME IMAGES</h2>
                    </section>
                    <br/>
                    <h3>Module Info</h3>
                    <section className="module-info">
                        <section className="labels">
                            <p>Type</p>
                            <p>Qty</p>
                            <p>kW</p>
                            <p>Wattage</p>
                            <p>Inverter</p>
                        </section>
                        <section className="info">
                            <p>{user.modType}</p>
                            <p>{user.modNum} Powerwalls</p>
                            <p>{user.modKW}kW</p>
                            <p>{user.modWattage}W</p>
                            <p>{user.inverter}</p>
                        </section>
                    </section>
                </>
                :
                <Login />
            }
        </div>
    )
}

export default Tesla;