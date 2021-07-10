// imports
import { Route } from 'react-router-dom';

// pages
import Tesla from './pages/Tesla';
import Tickets from './pages/Tickets';
import Referrals from './pages/Referrals';
import Contact from './pages/Contact';

// components
import NavBar from './components/NavBar';


function App() {
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

  

  return (
    <div className="App">
      <Route exact path="/" render={() => { return <Tesla /> }} />

      <Route exact path="/tickets" render={() => { return <Tickets /> }} />

      <Route exact path="/referrals" render={() => { return <Referrals /> }} />

      <Route exact path="/contact" render={() => { return <Contact /> }} />

      <NavBar />
    </div>
  );
}

export default App;
