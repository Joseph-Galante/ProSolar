// imports
import { Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';

// pages
import Tesla from './pages/Tesla';
import Tickets from './pages/Tickets';
import Referrals from './pages/Referrals';
import Contact from './pages/Contact';

// components
import NavBar from './components/NavBar';

// contexts
import { UserContext } from './contexts/UserContext';

function App() {
  // contexts
  const { userState, verifyUser } = useContext(UserContext);
  const [ user ] = userState;

  // functions
  /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
  let prevScrollpos = window.pageYOffset;
  window.onscroll = function()
  {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos)
    {
      document.querySelector(".navbar").classList.remove("scroll");
    }
    else
    {
      document.querySelector(".navbar").classList.add("scroll");
    }
    prevScrollpos = currentScrollPos;
  }

  // on component load
  useEffect(verifyUser, []);

  return (
    <div className="App">
      <Route exact path="/" render={() => {  return <Tesla /> }} />

      <Route exact path="/tickets" render={() => {   if (user.id) { return <Tickets /> } else { return <Tesla /> } }} />

      <Route exact path="/referrals" render={() => {   if (user.id) { return <Referrals /> } else { return <Tesla /> } }} />

      <Route exact path="/contact" render={() => {  if (user.id) { return <Contact /> } else { return <Tesla /> } }} />

      <NavBar />
    </div>
  );
}

export default App;
