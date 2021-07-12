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
    const [ tickets, setTickets ] = useState([]);
    
    // functions
    const submitTicket = (e) =>
    {
        e.preventDefault();
        // clear messages
        document.querySelector(".messages").innerHTML = null;
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
                    "ticket_id": res.data.ticket.id,
                    "opened": `${res.data.ticket.opened.slice(0, 10)} ${res.data.ticket.opened.slice(11, 13) % 12}${res.data.ticket.opened.slice(13, 19)} ${res.data.ticket.opened.slice(11, 13) / 12 >= 1 ? 'PM' : 'AM'}`
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
                // load tickets
                getTickets();
            }).catch(error => console.log(error.message));
        }).catch(error => console.log(error.message));
    }

    const getTickets = () =>
    {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}tickets/user`, { headers: { Authorization: user.id }
        }).then(res =>
        {
            // console.log(res)
            setTickets(res.data.tickets);
        }).catch(error => console.log(error.message));
    }

    // on component load
    useEffect(() => {setNav("#tickets")}, []);
    useEffect(getTickets, []);

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
            {tickets ?
                tickets.length > 0 ?
                    <section className="tickets">
                        <section className="ticket-ids">
                            <p>Number</p>
                            {tickets.map((t, i) =>
                            {
                                if (t.complete) return;
                                else return ( <p key={i}>#{t.id}</p> );
                            })}
                        </section>
                        <section className="ticket-titles">
                            <p>Title</p>
                            {tickets.map((t, i) =>
                            {
                                if (t.complete) return;
                                else return ( <p key={i+tickets.length}>{t.title}</p> );
                            })}
                        </section>
                        <section className="ticket-opens">
                            <p>Opened</p>
                            {tickets.map((t, i) =>
                            {
                                if (t.complete) return;
                                else return ( <p key={i+tickets.length*2}>{`${t.opened.slice(0, 10)} ${t.opened.slice(11, 13) % 12}${t.opened.slice(13, 19)} ${t.opened.slice(11, 13) / 12 > 1 ? 'PM' : 'AM'}`}</p> );
                            })}
                        </section>
                    </section>
                    :
                    'No tickets to display'
                    :
                    'Getting tickets...'
            }
        </div>      
    )
}

export default Tickets;