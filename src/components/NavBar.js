// imports
import { Link } from 'react-router-dom';

const NavBar = () =>
{
    // functions
    const setActive = (sec) =>
    {
        // clear active from all sections
        document.querySelectorAll(".nav-icon").forEach(s => s.classList.remove("active"));
        // add active to selected section
        sec.classList.add("active");
    }

    return (
        <div className="navbar">
            <section id="tesla" className="nav-icon">
                <Link to="/" onClick={() => {setActive(document.querySelector("#tesla"))}}>
                    <img id="tesla-inactive" src="https://i.imgur.com/ipRt20E.png" alt="404" width="35px" />
                    <img id="tesla-active" src="https://i.imgur.com/JAXz5gf.png" alt="404" width="35px" />
                    <p>Tesla</p>
                </Link>
            </section>
            <section id="tickets" className="nav-icon">
                <Link to="/tickets" onClick={() => {setActive(document.querySelector("#tickets"))}}>
                    <img id="tickets-inactive" src="https://i.imgur.com/QCVSuGg.png" alt="404" width="35px" />
                    <img id="tickets-active" src="https://i.imgur.com/BJ1DAKf.png" alt="404" width="35px" />
                    <p>Tickets</p>
                </Link>
            </section>
            <section id="referrals" className="nav-icon">
                <Link to="/referrals" onClick={() => {setActive(document.querySelector("#referrals"))}}>
                    <img id="referrals-inactive" src="https://i.imgur.com/cS0jfvU.png" alt="404" width="35px" />
                    <img id="referrals-active" src="https://i.imgur.com/mi9UXgB.png" alt="404" width="35px" />
                    <p>Referrals</p>
                </Link>
            </section>
            <section id="contact" className="nav-icon">
                <Link to="/contact" onClick={() => {setActive(document.querySelector("#contact"))}}>
                    <img id="contact-inactive" src="https://i.imgur.com/BFM4oF7.png" alt="404" width="35px" />
                    <img id="contact-active" src="https://i.imgur.com/HkkeXCQ.png" alt="404" width="35px" />
                    <p>Contact Us</p>
                </Link>
            </section>
        </div>
    )
}

export default NavBar;