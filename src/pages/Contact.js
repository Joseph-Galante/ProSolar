// imports
import { useContext, useEffect } from 'react';

// contexts
import { NavContext } from '../contexts/NavContext';

const Contact = () =>
{
    // contexts
    const { navState } = useContext(NavContext);
    const [ nav, setNav ] = navState;

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
            
            <input type="button" value="Contact Us" />
        </div>
    )
}

export default Contact;