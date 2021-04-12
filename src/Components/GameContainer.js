import { useEffect, useState } from "react";
import Game from "./Game";
import NewGameForm from "./NewGameForm";

function GameContainer({ user, sports }) {
    const [allGames, setAllGames] = useState([]);
    const [myGames, setMyGames] = useState([]);
    const [filter, setFilter] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/events')
        .then(r => r.json())
        .then(data => {
          setAllGames(data)
          setMyGames(user.events)
        })
    },[])

    function sendNewGame(data) {
        const newGameAdded = [...allGames, data]
        setAllGames(newGameAdded)

        const newUserEvent = {
            user_id: user.id,
            event_id: data.id
        }

        fetch('http://localhost:3000/user_events', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserEvent)
        })
        .then(r => r.json())
        .then(data => {
          const newUserGame = [...myGames, data]
          setMyGames(newUserGame)
        })
    }

    const filtered = allGames.filter(game => {
      return game.users.id === user.id
    })


    const everyGame = allGames.map(game => {
        return (
          <Game 
            key={game.id}
            id={game.id}
            location={game.location}
            equipment={game.equipment}
            sport={game.sport}
            date={game.date}
            time={game.time}
            lat={game.lat}
            lng={game.lng}
            users={game.users}
            user={user}
          />
        )
    })

    const justMyGames = myGames?.map(game => {
       return ( 
          <Game 
            key={game.id}
            location={game.location}
            equipment={game.equipment}
            sport={game.sports}
            date={game.date}
            time={game.time}
            lat={game.lat}
            lng={game.lng}
            users={game.users}
            user={user}
          />
       )
    })

    return (
      <div className="game-container">
        <NewGameForm sendNewGame={sendNewGame} sports={sports}/>
        <button onClick={() => setFilter(!filter)}>{filter ? "Show All PickUp Games" : "Just My PickUp Games"}</button>
        {filter ? justMyGames : everyGame}
      </div>
    );
}
  
export default GameContainer;