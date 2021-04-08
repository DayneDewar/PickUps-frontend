import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import AllSports from './Components/AllSports';
import GameContainer from './Components/GameContainer';
import Header from './Components/Header';
import NavBar from './Components/NavBar';
import Profile from './Components/Profile';

function App() {

  const [currentUser, setCurrentUser] = useState({});

  useEffect(()=>{
    //NOT dynamic
    fetch('http://localhost:3000/users/1')
    .then(r => r.json())
    .then(data => setCurrentUser(data))
  }, [])

  return (
    <div>
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <AllSports />
        </Route>
        <Route exact path="/MyProfile">
          <Profile user={currentUser}/>
        </Route>
        <Route exact path="/NewEvent">
          
        </Route>
        <Route exact path="/Games">
          <GameContainer />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
