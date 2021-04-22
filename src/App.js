import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router';
import AllSports from './Components/AllSports';
import GameContainer from './Components/GameContainer';
import HeaderComponent from './Components/HeaderComponent';
import NavBar from './Components/NavBar';
import NewSportForm from './Components/NewSportForm';
import Profile from './Components/Profile';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { useDispatch } from 'react-redux';
import { overrideSports } from './Redux/sportsSlice';
import { overrideGames } from './Redux/gamesSlice';


function App() {

  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
      fetch('http://localhost:3000/sports')
      .then(r => r.json())
      .then(data => dispatch(overrideSports(data)))
  }, [])

  useEffect(() => {
    fetch('http://localhost:3000/events')
      .then(r => r.json())
      .then(data => dispatch(overrideGames(data)))
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch('http://localhost:3000/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(r => {
        return r.json().then(data => {
          if (r.ok) {
            return data
          } else {
            throw data
          }
        })
      })
      .then(data => setUser(data))
      .catch(error => console.log(error))
  }, [])

  return (
    <div>
      <HeaderComponent />
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route exact path="/">
          <AllSports user={user} />
        </Route>
        <Route exact path="/MyProfile">
          <Profile user={user} setUser={setUser} />
        </Route>
        <Route exact path="/NewSport">
          <NewSportForm user={user} />
        </Route>
        <Route exact path="/Games">
          <GameContainer user={user} />
        </Route>
        <Route exact path="/Login">
          <Login setUser={setUser} />
        </Route>
        <Route exact path="/Signup">
          <Signup setUser={setUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
