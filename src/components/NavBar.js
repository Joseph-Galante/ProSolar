// imports
import { Link } from 'react-router-dom';

const NavBar = () =>
{
    return (
        <div className="navbar">
            <section id="tesla" className="nav-icon">
                <Link to="/">
                    <img id="tesla-inactive" src="https://i.imgur.com/ipRt20E.png" alt="404" width="40px" />
                    <img id="tesla-active" src="https://i.imgur.com/JAXz5gf.png" alt="404" width="40px" />
                    <p>Tesla</p>
                </Link>
            </section>
            <section id="tickets" className="nav-icon">
                <Link to="/tickets">
                    <img id="tickets-inactive" src="https://i.imgur.com/QCVSuGg.png" alt="404" width="40px" />
                    <img id="tickets-active" src="https://i.imgur.com/BJ1DAKf.png" alt="404" width="40px" />
                    <p>Tickets</p>
                </Link>
            </section>
            <section id="referrals" className="nav-icon">
                <Link to="/referrals">
                    <img id="referrals-inactive" src="https://i.imgur.com/cS0jfvU.png" alt="404" width="40px" />
                    <img id="referrals-active" src="https://i.imgur.com/mi9UXgB.png" alt="404" width="40px" />
                    <p>Referrals</p>
                </Link>
            </section>
            <section id="contact" className="nav-icon">
                <Link to="/contact">
                    <img id="contact-inactive" src="https://i.imgur.com/BFM4oF7.png" alt="404" width="40px" />
                    <img id="contact-active" src="https://i.imgur.com/HkkeXCQ.png" alt="404" width="40px" />
                    <p>Contact Us</p>
                </Link>
            </section>
        </div>
    )
}

export default NavBar;