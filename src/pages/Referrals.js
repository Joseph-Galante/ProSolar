// imports
import { useContext, useEffect, useState } from 'react';
import { send } from 'emailjs-com';

// contexts
import { NavContext } from '../contexts/NavContext';
import { UserContext } from '../contexts/UserContext';

const Referrals = () =>
{
    // contexts
    const { navState } = useContext(NavContext);
    const [ nav, setNav ] = navState;
    const { userState } = useContext(UserContext);
    const [ user ] = userState;
    
    // states
    const [ friendsName, setFriendsName ] = useState('');
    const [ friendsEmail, setFriendsEmail ] = useState('');
    const [ friendsPhone, setFriendsPhone ] = useState('');
    const [ yourName, setYourName ] = useState(user.name);
    const [ yourEmail, setYourEmail ] = useState(user.email);
    const [ yourPhone, setYourPhone ] = useState('');

    // functions
    const submitReferral = (e) =>
    {
        e.preventDefault();
        // clear messages
        document.querySelector(".messages").innerHTML = null;
        // check for empty fields
        if (friendsName === "" || friendsEmail === "" || yourName === "" || yourEmail === "")
        {
            if (friendsName === "")
            {
                // grab friend's name input
                const friendsNameInput = document.querySelector("#friends-name");
                // add invalid class
                friendsNameInput.classList.add("invalid");
                // create invalid message
                const message = document.createElement("p");
                message.innerHTML = "Friend's name is required";
                message.style.color = "red";
                // add message
                document.querySelector(".messages").append(message);
            }
            else
            {
                document.querySelector("#friends-name").classList.remove("invalid");
            }
            if (friendsEmail === "")
            {
                // grab friend's email input
                const friendsEmailInput = document.querySelector("#friends-email");
                // add invalid class
                friendsEmailInput.classList.add("invalid");
                // create invalid message
                const message = document.createElement("p");
                message.innerHTML = "Friend's email is required";
                message.style.color = "red";
                // add message
                document.querySelector(".messages").append(message);
            }
            else
            {
                document.querySelector("#friends-email").classList.remove("invalid");
            }
            if (yourName === "")
            {
                // grab name input
                const yourNameInput = document.querySelector("#your-name");
                // add invalid class
                yourNameInput.classList.add("invalid");
                // create invalid message
                const message = document.createElement("p");
                message.innerHTML = "Your name is required";
                message.style.color = "red";
                // add message
                document.querySelector(".messages").append(message);
            }
            else
            {
                document.querySelector("#your-name").classList.remove("invalid");
            }
            if (yourEmail === "")
            {
                // grab email input
                const yourEmailInput = document.querySelector("#your-email");
                // add invalid class
                yourEmailInput.classList.add("invalid");
                // create invalid message
                const message = document.createElement("p");
                message.innerHTML = "Your email is required";
                message.style.color = "red";
                // add message
                document.querySelector(".messages").append(message);
            }
            else
            {
                document.querySelector("#your-email").classList.remove("invalid");
            }
            return;
        }
        else
        {
            document.querySelectorAll(".referral-input").forEach(i =>
            { 
                i.classList.remove("invalid");
            });
        }

        send(
            'service_qgtt9iq',
            'template_ax9w1fm',
            {
                "from_name": user.name,
                "from_email": user.email,
                "from_phone": yourPhone !== "" ? yourPhone : "N/A",
                "referral_name": friendsName,
                "referral_email": friendsEmail,
                "referral_phone": friendsPhone !== "" ? friendsPhone : "N/A"
            },
            'user_VumGsyYh6mZ735zAMicaM'
        ).then(res =>
        {
            // console.log('Email sent', res.status, res.text);
            // clear messages
            document.querySelector(".messages").innerHTML = null;
            // create success message
            const message = document.createElement("p");
            message.innerHTML = "Thank you for your referral!";
            message.style.color = "#70c62f";
            // display message
            document.querySelector(".messages").append(message);
            // clear referral form
            setFriendsName('');
            setFriendsEmail('');
            setFriendsPhone('');
        }).catch(error => console.log(error.message));
    }

    // on component load
    useEffect(() => {setNav("#referrals")}, []);

    return (
        <div className="referrals-page">
            <h2>Refer A Friend</h2>
            <h4>Earn $500 for each referral!</h4>
            <p>Step 1. Fill out the contact form on this page with your friend's information.</p>
            <p>Step 2. We will contact your friend and share the incredible benefits of going solar!</p>
            <p>Step 3. Once your referral signs a contract with ProSolar, you will receive a Visa gift card for $500 within 30 days!</p>
            <p className="messages"></p>
            <form className="referral-form" onSubmit={submitReferral}>
                <label className="friends-name-label">
                    <span>Friend's Name</span>
                    <span className="required">*</span>
                </label>
                <input id="friends-name" className="referral-input" type="text" placeholder="Friend's name" value={friendsName} onChange={(e) => {setFriendsName(e.target.value)}} />
                <label className="friends-name-label">
                    <span>Friend's Email</span>
                    <span className="required">*</span>
                </label>
                <input id="friends-email" className="referral-input" type="text" placeholder="Friend's email" value={friendsEmail} onChange={(e) => {setFriendsEmail(e.target.value)}} />
                <label className="friends-name-label">
                    <span>Friend's Phone</span>
                </label>
                <input className="referral-input" type="text" placeholder="Friend's phone" value={friendsPhone} onChange={(e) => {setFriendsPhone(e.target.value)}} />
                <label className="friends-name-label">
                    <span>Your Name</span>
                    <span className="required">*</span>
                </label>
                <input id="your-name" className="referral-input" type="text" placeholder="Your name" value={user.name} />
                <label className="friends-name-label">
                    <span>Your Email</span>
                    <span className="required">*</span>
                </label>
                <input id="your-email" className="referral-input" type="text" placeholder="Your email" value={user.email} />
                <label className="friends-name-label">
                    <span>Your Phone</span>
                </label>
                <input className="referral-input" type="text" placeholder="Your phone" value={yourPhone} onChange={(e) => {setYourPhone(e.target.value)}} />
            </form>
            <input type="submit" value="Submit" onClick={submitReferral} />
        </div>
    )
}

export default Referrals;