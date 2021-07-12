// imports
import { useContext, useEffect, useState } from 'react';

// contexts
import { NavContext } from '../contexts/NavContext';
import { UserContext } from '../contexts/UserContext';

const Contact = () =>
{
    // contexts
    const { navState } = useContext(NavContext);
    const [ nav, setNav ] = navState;
    const { userState } = useContext(UserContext);
    const [ user ] = userState;

    // states
    const [ contacting, setContacting ] = useState(false);
    const [ phone, setPhone ] = useState('');
    const [ subject, setSubject ] = useState('');
    const [ contactMessage, setContactMessage ] = useState('');

    // functions
    const dropLine = (e) =>
    {
        e.preventDefault();

    }

    // on component load
    useEffect(() => {setNav("#contact")}, []);

    return (
        <div className="contact-page">
            <h3>HEADQUARTERS</h3>
            <h3>US VIRGIN ISLANDS</h3>
            <br/>

            <h3>ST. THOMAS</h3>
            <p>(340) 201 4752</p>
            <p>(Across from Home Depot)</p>
            <p>Bottom of Donoe Hill</p>
            <p>4011 New Herrnhut Suite 200</p>
            <p>St. Thomas VI, 00802</p>

            <h3>ST. CROIX</h3>
            <p>(340) 514 1530</p>
            <p>(Behind Maria's Cantina)</p>
            <p>Gallows Bay</p>
            <p>5007 Starboard St, Suite 7</p>
            <p>Christiansted, 00820</p>

            <h3>BRITISH VIRGIN ISLANDS</h3>
            <p>(284) 494 1478</p>
            <p>Port Purcell Warehouse 12</p>
            <p>Roadtown, Tortola VG1110</p>
            <p>British Virgin Islands</p>

            <h3>CAYMAN ISLANDS</h3>
            <p>(345) 926 2676</p>
            <p>5 Blue Bird Warehouse</p>
            <p>Cane Bird Avenue</p>
            <p>Cayman Islands</p>

            <h3>FLORIDA</h3>
            <p>1 (888) 462 5005</p>
            <p>1100 W Oakland Park Blvd Unit 8</p>
            <p>Wilton Manors, FL 33311, USA</p>
            <p>*Multiple Locations</p>
            
            <input type="button" value="Contact Us" onClick={() => {setContacting(true)}} />

            {contacting ?
                <section className="drop-line">
                    <form className="contact-form" onSubmit={dropLine}>
                        <label className="name-label">
                            <span>Name</span>
                            <span className="required">*</span>
                        </label>
                        <input id="name" className="contact-input" type="text" placeholder="Name" value={user.name} />
                        <label className="email-label">
                            <span>Email</span>
                            <span className="required">*</span>
                        </label>
                        <input id="email" className="contact-input" type="text" placeholder="Email" value={user.email} />
                        <label className="phone-label">
                            <span>Phone</span>
                            <span className="required">*</span>
                        </label>
                        <input id="phone" className="contact-input" type="text" placeholder="Phone" value={phone} onChange={(e) => {setPhone(e.target.value)}} />
                        <label className="subject-label">
                            <span>Subject</span>
                            <span className="required">*</span>
                        </label>
                        <input id="subject" className="contact-input" type="text" placeholder="Subject" value={subject} onChange={(e) => {setSubject(e.target.value)}} />
                        <label className="message-label">
                            <span>Message</span>
                            <span className="required">*</span>
                        </label>
                        <input id="message" className="contact-input" type="text" placeholder="Message" value={contactMessage} onChange={(e) => {setContactMessage(e.target.value)}} />
                    </form>
                    <input type="button" value="Cancel" onClick={() => {setContacting(false)}} />
                    <input type="submit" value="Submit" onClick={dropLine} />
                </section>
                :
                null
            }
        </div>
    )
}

export default Contact;