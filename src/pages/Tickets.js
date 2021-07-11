// imports
import { useContext, useEffect, useState } from 'react';

// contexts
import { NavContext } from '../contexts/NavContext';
const Tickets = () =>
{
    // contexts
    const { navState } = useContext(NavContext);
    const [ nav, setNav ] = navState;

    // states
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');

    // on component load
    useEffect(() => {setNav("#tickets")}, []);

    return (
        <div className="tickets-page">
            <h2>Submit A Service Ticket</h2>
            <form className="ticket-form">
                <label className="title-label">Title</label>
                <input type="text" placeholder="Title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                <label className="description-label">Description</label>
                <input type="text" placeholder="Description" value={description} onChange={(e) => {setDescription(e.target.value)}} />
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
                    <p>Closed</p>
                </span>
            </section>
        </div>      
    )
}

export default Tickets;