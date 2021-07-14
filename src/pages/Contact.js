// imports
import { useContext, useEffect, useState } from 'react';
import { send } from 'emailjs-com';

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
        // clear messages
        document.querySelector(".messages").innerHTML = null;
        // check for empty fields
        if (phone === "" || subject === "" || contactMessage === "")
        {
            if (phone === "")
            {
                // grab phone input
                const phoneInput = document.querySelector("#phone");
                // add invalid class
                phoneInput.classList.add("invalid");
                // create invalid message
                const message = document.createElement("p");
                message.innerHTML = "Phone is required";
                message.style.color = "red";
                // add message
                document.querySelector(".messages").append(message);
            }
            else
            {
                document.querySelector("#phone").classList.remove("invalid");
            }
            if (subject === "")
            {
                // grab subject input
                const subjectInput = document.querySelector("#subject");
                // add invalid class
                subjectInput.classList.add("invalid");
                // create invalid message
                const message = document.createElement("p");
                message.innerHTML = "Subject is required";
                message.style.color = "red";
                // add message
                document.querySelector(".messages").append(message);
            }
            else
            {
                document.querySelector("#subject").classList.remove("invalid");
            }
            if (contactMessage === "")
            {
                // grab message input
                const messageInput = document.querySelector("#message");
                // add invalid class
                messageInput.classList.add("invalid");
                // create invalid message
                const message = document.createElement("p");
                message.innerHTML = "Message is required";
                message.style.color = "red";
                // add message
                document.querySelector(".messages").append(message);
            }
            else
            {
                document.querySelector("#message").classList.remove("invalid");
            }
            return;
        }
        else
        {
            document.querySelectorAll(".contact-input").forEach(i =>
            { 
                i.classList.remove("invalid");
            });
        }

        send(
            'service_qgtt9iq',
            'template_w2uzrgp',
            {
                "from_name": user.name,
                "from_email": user.email,
                "from_phone": phone,
                "subject": subject,
                "message": contactMessage
            },
            'user_VumGsyYh6mZ735zAMicaM'
        ).then(res =>
        {
            // console.log('Email sent', res.status, res.text);
            // clear messages
            document.querySelector(".messages").innerHTML = null;
            setContacting(false);
            // create success message
            const message = document.createElement("p");
            message.innerHTML = "Thank you for contacting us. A sales representative will get back to you as soon as possible.";
            message.style.color = "#70c62f";
            // display message
            document.querySelector(".messages").append(message);
            // clear contact form
            setPhone('');
            setSubject('');
            setContactMessage('');
        }).catch(error => console.log(error.message));
    }

    // on component load
    useEffect(() => {setNav("#contact")}, []);

    return (
        <div className="contact-page">
            <section className={contacting ? "contact-info blurred" : "contact-info"}>
                <h3 style={{margin: "20px 0 10px 0"}}>HEADQUARTERS</h3>
                <h3 style={{margin: "10px 0"}}>US VIRGIN ISLANDS</h3>

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
                
                {contacting ? null : <p className="messages"></p>}

                <input type="button" value="Contact Us" onClick={() => {setContacting(true)}} />
            </section>

            {contacting ?
                <section className="drop-line">
                    <h3>Drop us a line</h3>
                    <p className="messages"></p>
                    <form className="contact-form" onSubmit={dropLine}>
                        <label className="name-label">
                            <span>Name</span>
                            <span className="required">*</span>
                        </label>
                        <input id="name" className="contact-input" type="text" placeholder="Name" value={user.name}  readOnly />
                        <label className="email-label">
                            <span>Email</span>
                            <span className="required">*</span>
                        </label>
                        <input id="email" className="contact-input" type="text" placeholder="Email" value={user.email}  readOnly />
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
                        <textarea id="message" className="contact-input" type="text" placeholder="Message" value={contactMessage} onChange={(e) => {setContactMessage(e.target.value)}} />
                    </form>
                    <section className="contact-inputs">
                        <input type="button" value="Cancel" onClick={() => {setContacting(false)}} />
                        <input type="submit" value="Submit" onClick={dropLine} />
                    </section>
                </section>
                :
                null
            }
        </div>
    )
}

export default Contact;