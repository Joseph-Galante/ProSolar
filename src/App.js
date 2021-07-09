// imports
import { Route } from 'react-router-dom';

// pages
import Tesla from './pages/Tesla';

// components
import NavBar from './components/NavBar';


function App() {
  return (
    <div className="App">
      <NavBar />

      <Route exact path="/" render={() => { return <Tesla /> }} />
    </div>
  );
}

export default App;
