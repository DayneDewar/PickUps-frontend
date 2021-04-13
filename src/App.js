import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import AllSports from './Components/AllSports';
import GameContainer from './Components/GameContainer';
import Header from './Components/Header';
import NavBar from './Components/NavBar';
import NewSportForm from './Components/NewSportForm';
import Profile from './Components/Profile';
import Signup from './Components/Signup';
import Login from './Components/Login';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [sports, setSports] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
    
  useEffect(() => {
      fetch('http://localhost:3000/sports')
      .then(r => r.json())
      .then(data => setSports(data))
  }, [])

  function addNewSport(sport) {
    const updatedSports = [...sports, sport]
    setSports(updatedSports)
  }

  useEffect(()=>{
    //NOT dynamic
    fetch('http://localhost:3000/users/1')
    .then(r => r.json())
    .then(data => setCurrentUser(data))
  }, [])

  function changeLogin(userInfo) {
    setSignedIn(!signedIn)
    setCurrentUser(userInfo)
  }

  function updateAccount(data) {
    
  }

  return (
    <div>
      <Header />
      <NavBar signedIn={signedIn} />
      <Switch>
        <Route exact path="/">
          <AllSports sports={sports} user={currentUser} updateAccount={updateAccount}/>
        </Route>
        <Route exact path="/MyProfile">
          <Profile user={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route exact path="/NewSport">
          <NewSportForm user={currentUser} addNewSport={addNewSport} />
        </Route>
        <Route exact path="/Games">
          <GameContainer user={currentUser} sports={sports} />
        </Route>
        <Route exact path="/Login">
          <Login changeLogin={changeLogin}/>
        </Route>
        <Route exact path="/Signup">
          <Signup changeLogin={changeLogin} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
