// imports
import { useState } from 'react';

const Tickets = () =>
{
    // states
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');

    return (
        <div className="tickets-page">
            <h2>Submit A Service Ticket</h2>
            <form className="ticket-form">
                <label className="ticket-label">Title:</label>
                <input type="text" placeholder="Title" onChange={(e) => {setTitle(e.value)}} />
                <label className="ticket-label">Description:</label>
                <input type="text" placeholder="Description" onChange={(e) => {setDescription(e.value)}} />
                <input type="submit" value="Submit Ticket" />
            </form>

            <h2>Open Tickets</h2>
            <section className="open-tickets">
                <span className="open-tickets-header">
                    <p>Number</p>
                    <p>Opened</p>
                    <p>Title</p>
                    <p>Caller</p>
                    <p>Status</p>
                </span>
            </section>
        </div>      
    )
}

export default Tickets;