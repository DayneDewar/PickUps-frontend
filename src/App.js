import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import AllSports from './Components/AllSports';
import GameContainer from './Components/GameContainer';
import Header from './Components/Header';
import NavBar from './Components/NavBar';
import NewGameForm from './Components/NewGameForm';
import NewSportForm from './Components/NewSportForm';
import Profile from './Components/Profile';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [sports, setSports] = useState([]);
    
  useEffect(() => {
      fetch('http://localhost:3000/sports')
      .then(r => r.json())
      .then(data => setSports(data))
  }, [])

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
          <AllSports sports={sports} />
        </Route>
        <Route exact path="/MyProfile">
          <Profile user={currentUser} />
        </Route>
        <Route exact path="/NewSport">
          <NewSportForm user={currentUser} />
        </Route>
        <Route exact path="/Games">
          <GameContainer user={currentUser} sports={sports} />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
