// imports
import { useContext, useEffect, useState } from 'react';

// contexts
import { NavContext } from '../contexts/NavContext';

const Referrals = () =>
{
    // contexts
    const { navState } = useContext(NavContext);
    const [ nav, setNav ] = navState;
    
    // states
    const [ friendsName, setFriendsName ] = useState('');
    const [ friendsEmail, setFriendsEmail ] = useState('');
    const [ friendsPhone, setFriendsPhone ] = useState('');
    const [ yourName, setYourName ] = useState('');
    const [ yourEmail, setYourEmail ] = useState('');
    const [ yourPhone, setYourPhone ] = useState('');

    // on component load
    useEffect(() => {setNav("#referrals")}, []);

    return (
        <div className="referrals-page">
            <h2>Refer A Friend</h2>
            <h4>Earn $500 for each referral!</h4>
            <p>Step 1. Fill out the contact form on this page with your friend's information.</p>
            <p>Step 2. We will contact your friend and share the incredible benefits of going solar!</p>
            <p>Step 3. Once your referral signs a contract with ProSolar, you will receive a Visa gift card for $500 within 30 days!</p>
            <form className="referral-form">
                <label className="friends-name-label">
                    <span>Friend's Name</span>
                    <span className="required">*</span>
                </label>
                <input type="text" placeholder="Friend's name" value={friendsName} onChange={(e) => {setFriendsName(e.target.value)}} />
                <label className="friends-name-label">
                    <span>Friend's Email</span>
                    <span className="required">*</span>
                </label>
                <input type="text" placeholder="Friend's email" value={friendsEmail} onChange={(e) => {setFriendsEmail(e.target.value)}} />
                <label className="friends-name-label">
                    <span>Friend's Phone</span>
                </label>
                <input type="text" placeholder="Friend's phone" value={friendsPhone} onChange={(e) => {setFriendsPhone(e.target.value)}} />
                <label className="friends-name-label">
                    <span>Your Name</span>
                    <span className="required">*</span>
                </label>
                <input type="text" placeholder="Your name" value={yourName} onChange={(e) => {setYourName(e.target.value)}} />
                <label className="friends-name-label">
                    <span>Your Email</span>
                    <span className="required">*</span>
                </label>
                <input type="text" placeholder="Your email" value={yourEmail} onChange={(e) => {setYourEmail(e.target.value)}} />
                <label className="friends-name-label">
                    <span>Your Phone</span>
                </label>
                <input type="text" placeholder="Your phone" value={yourPhone} onChange={(e) => {setYourPhone(e.target.value)}} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Referrals;