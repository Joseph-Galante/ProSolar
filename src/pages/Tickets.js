// imports
import { useContext, useEffect, useState } from 'react';
import { send } from 'emailjs-com';
import axios from 'axios';

// contexts
import { NavContext } from '../contexts/NavContext';
import { UserContext } from '../contexts/UserContext';

const Tickets = () =>
{
    // contexts
    const { navState } = useContext(NavContext);
    const [ nav, setNav ] = navState;
    const { userState } = useContext(UserContext);
    const [ user ] = userState;

    // states
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');

    // functions
    const submitTicket = (e) =>
    {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}tickets/submit`, {
            title, description}, { headers: { Authorization: user.id }
        }).then(res => {
            // console.log(res);
            send(
                'service_qgtt9iq',
                'template_v0ojuhp',
                {
                    "from_name": user.name,
                    "from_email": user.email,
                    "title": title,
                    "message": description,
                    "ticket_id": res.data.ticket.id
                },
                'user_VumGsyYh6mZ735zAMicaM'
            ).then(res =>
            {
                // console.log('Email sent', res.status, res.text);
                // clear messages
                document.querySelector(".messages").innerHTML = null;
                // create success message
                const message = document.createElement("p");
                message.innerHTML = "Your ticket has been submitted. A service representative will get back to you as soon as possible.";
                message.style.color = "#70c62f";
                // display message
                document.querySelector(".messages").append(message);
                // clear ticket form
                setTitle('');
                setDescription('');
            }).catch(error => console.log(error.message));
        }).catch(error => console.log(error.message));
    }

    // on component load
    useEffect(() => {setNav("#tickets")}, []);

    return (
        <div className="tickets-page">
            <h2>Submit A Service Ticket</h2>
            <p className="messages"></p>
            <form className="ticket-form" onSubmit={submitTicket}>
                <section className="labels">
                    <p className="title-label">Title</p>
                    <p className="description-label">Description</p>
                </section>
                <section className="inputs">
                    <input type="text" placeholder="Title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                    <textarea placeholder="Description" value={description} onChange={(e) => {setDescription(e.target.value)}} />
                </section>
            </form>
            <input type="submit" value="Submit Ticket" onClick={submitTicket} />

            <h2>Open Tickets</h2>
            <section className="open-tickets">
                <span className="open-tickets-header">
                    <p>Number</p>
                    <p>Opened</p>
                    <p>Title</p>
                    <p>Caller</p>
                    <p>Status</p>
                    <p>Closed</p>
                </span>
            </section>
        </div>      
    )
}

export default Tickets;