// imports
import React, { useContext, useEffect, useState } from 'react';
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

    // variables
    let url = 'https://prosolardata.herokuapp.com';

    // functions
    const logout = () =>
    {
        localStorage.removeItem('userId');
        setUser({});
    }

    const editInfo = () =>
    {
        // clear messages
        document.querySelector(".messages").innerHTML = null;
        // check for empty fields
        if (name === "" || email === "" || password === "")
        {
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
            else
            {
                document.querySelector("#name").classList.remove("invalid");
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
            else
            {
                document.querySelector("#email").classList.remove("invalid");
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
            else
            {
                document.querySelector("#password").classList.remove("invalid");
            }
            return;
        }
        else
        {
            document.querySelectorAll(".edit-info-input").forEach(i =>
            { 
                i.classList.remove("invalid");
            });
        }
        // check for dev env
        if (process.env.ENV === 'dev')
        {
            url = process.env.REACT_APP_BACKEND_URL;
        }

        axios.put(`${url}/user/profile`, {
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
                                <input id="name" className="edit-info-input" type="text" placeholder="Name" value={name} onChange={(e) => {setName(e.target.value)}} />
                                <input id="email" className="edit-info-input" type="text" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                                <input id="password" className="edit-info-input" type="text" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
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
                    <h3>Home Images</h3>
                    <section className="home-units">
                        {user.id ?
                            user.homeImages ?
                                user.homeImages.length === 0 ?
                                    'No images to display'
                                    :
                                    user.homeImages.map((img, i) =>
                                    {
                                        return (
                                            <img key={i} src={img.src} alt="404" width="50%" /> 
                                        )
                                    })
                                :
                                'No images to display'
                            :
                            'Getting home images...'

                        }
                    </section>
                    <br/>
                    <h3>Module Info</h3>
                    <section className="module-info">
                        <section className="labels">
                            <p>Type</p>
                            <p>Quantity</p>
                            <p>kW Proposed</p>
                            <p>Wattage</p>
                            <p>Inverter</p>
                            <p>Powerwalls</p>
                        </section>
                        <section className="info">
                            <p>{user.modType}</p>
                            <p>{user.modNum}</p>
                            <p>{user.modKW / 1000} kW</p>
                            <p>{user.modWattage} W</p>
                            <p>{user.inverter}</p>
                            <p>{user.powerwallNum}</p>
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