import { useEffect, useState } from "react";
import Game from "./Game";
import NewGameForm from "./NewGameForm";

function GameContainer({ user }) {
    const [allGames, setAllGames] = useState([]);
    const [myGames, setMyGames] = useState([]);
    const [filter, setFilter] = useState(false);
    const [gameData, setGameData] = useState({})

    useEffect(() => {
        fetch('http://localhost:3000/events')
        .then(r => r.json())
        .then(data => setAllGames(data))
    },[])

    function sendNewGame(data) {
        const newGameAdded = [...allGames, data]
        setAllGames(newGameAdded)

        const newUserEvent = {
            //change user to dynamic
            user_id: 1,
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
        .then(data => console.log(data))
    }
    // useEffect(() => {
    //     fetch(`http://localhost:3000/users/${user.id}`)
    //     .then(r => r.json())
    //     .then(user => setMyGames(user.events))
    // }, [])

    const everyGame = allGames.map(game => {
        return (
          <Game 
            key={game.id}
            location={game.location}
            equipment={game.equipment}
            players={game.players}
            sport={game.sport}
            date={game.date}
            time={game.time}
            lat={game.lat}
            lng={game.lng}
          />
        )
    })

    const justMyGames = myGames.map(game => {
       return ( 
          <Game 
            key={game.id}
            location={game.location}
            equipment={game.equipment}
            players={game.players}
            sport={game.sport}
            date={game.date}
            time={game.time}
            lat={game.lat}
            lng={game.lng}
          />
       )
    })

    return (
      <div className="game-container">
          {/* <input type="checkbox" onChange={setFilter(!filter)} /> */}
          {filter ? justMyGames : everyGame }
          <NewGameForm sendNewGame={sendNewGame}/>
      </div>
    );
}
  
export default GameContainer;