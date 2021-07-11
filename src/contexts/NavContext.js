// imports
import { useState, createContext } from 'react';

const NavContext = createContext();

const NavProvider = ({children}) =>
{
    const [nav, setNav] = useState("#tesla");

    // functions
    const setActive = () =>
    {
        // clear active from all sections
        document.querySelectorAll(".nav-icon").forEach(s => s.classList.remove("active"));
        // add active to selected section
        document.querySelector(nav).classList.add("active");
    }

    const state = {
        navState: [nav, setNav],
        setActive: setActive
    };

    return (
        <NavContext.Provider value={state}>
            {children}
        </NavContext.Provider>
    )
}

export {NavContext, NavProvider}