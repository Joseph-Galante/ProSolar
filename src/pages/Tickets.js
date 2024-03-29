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

    // variables
    let url = 'https://prosolardata.herokuapp.com';
    
    // functions
    const submitTicket = (e) =>
    {
        e.preventDefault();
        // clear messages
        document.querySelector(".messages").innerHTML = null;
        // check for empty fields
        if (title === "" || description === "")
        {
            if (title === "")
            {
                // grab title input
                const titleInput = document.querySelector("#title");
                // add invalid class
                titleInput.classList.add("invalid");
                // create invalid message
                const message = document.createElement("p");
                message.innerHTML = "Subject is required";
                message.style.color = "red";
                // add message
                document.querySelector(".messages").append(message);
            }
            else
            {
                document.querySelector("#title").classList.remove("invalid");
            }
            if (description === "")
            {
                // grab description input
                const descriptionInput = document.querySelector("#description");
                // add invalid class
                descriptionInput.classList.add("invalid");
                // create invalid message
                const message = document.createElement("p");
                message.innerHTML = "Description is required";
                message.style.color = "red";
                // add message
                document.querySelector(".messages").append(message);
            }
            else
            {
                document.querySelector("#description").classList.remove("invalid");
            }
            return;
        }
        else
        {
            document.querySelectorAll(".ticket-input").forEach(i =>
            { 
                i.classList.remove("invalid");
            });
        }

        // check for dev env
        if (process.env.ENV === 'dev')
        {
            url = process.env.REACT_APP_BACKEND_URL;
        }

        // // clear messages
        // document.querySelector(".messages").innerHTML = null;
        // // create error message
        // const message = document.createElement("p");
        // message.innerHTML = `URL: ${url}`;
        // message.style.color = "red";
        // // add message
        // document.querySelector(".messages").append(message);

        axios.post(`${url}/tickets/submit`, {
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
                    "opened": `${res.data.ticket.opened.slice(0, 8)}${res.data.ticket.opened.slice(11, 13) < 4 ? res.data.ticket.opened.slice(8, 10) - 1 : res.data.ticket.opened.slice(8, 10)} ${convertTime(res.data.ticket.opened.slice(11, 13))}${res.data.ticket.opened.slice(13, 19)} ${res.data.ticket.opened.slice(11, 13) < 4 ? 'PM' : res.data.ticket.opened.slice(11, 13) / 12 < 1 ? 'AM' : 'PM'}`
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
        }).catch((error) => {
            console.log(error.message);
        });
    }

    const getTickets = () =>
    {
        // check for dev env
        if (process.env.ENV === 'dev')
        {
            url = process.env.REACT_APP_BACKEND_URL;
        }

        axios.get(`${url}/tickets/user`, { headers: { Authorization: user.id }
        }).then(res =>
        {
            // console.log(res)
            setTickets(res.data.tickets);
        }).catch(error => console.log(error.message));
    }

    const convertTime = (time) =>
    {
        if (time < 4)
        {
            time = parseInt(time) + 24;
        }
        
        time = Math.abs(time - 12) - 4;

        return time == 0 ? 12 : time;
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
                    <p className="title-label">
                        <span>Subject</span>
                        <span className="required">*</span>
                    </p>
                    <p className="description-label">
                        <span>Description</span>
                        <span className="required">*</span>
                    </p>
                </section>
                <section className="inputs">
                    <input id="title"className="ticket-input" type="text" placeholder="Subject" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                    <textarea id="description"className="ticket-input" placeholder="Description" value={description} onChange={(e) => {setDescription(e.target.value)}} />
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
                            <p>Subject</p>
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
                                else return ( <p key={i+tickets.length*2}>{`${t.opened.slice(0, 8)}${t.opened.slice(11, 13) < 4 ? t.opened.slice(8, 10) - 1 : t.opened.slice(8, 10)} ${convertTime(t.opened.slice(11, 13))}${t.opened.slice(13, 19)} ${t.opened.slice(11, 13) < 4 ? 'PM' : t.opened.slice(11, 13) / 12 < 1 ? 'AM' : 'PM'}`}</p> );
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