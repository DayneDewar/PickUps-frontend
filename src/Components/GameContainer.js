import { useEffect, useState } from "react";
import Game from "./Game";

function GameContainer() {
    const [allGames, setAllGames] = useState([]);
    const [myGames, setMyGames] = useState([]);
    const [filter, setFilter] = useState(false)

    useEffect(() => {
        fetch('http://localhost:3000/events')
        .then(r => r.json())
        .then(data => setAllGames(data))
    },[])

    useEffect(() => {
        fetch(`http://localhost:3000/users/${user}`)
        .then(r => r.json())
        .then(user => setMyGames(user.events))
    })

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
          />
       )
    })

    return (
      <div className="game-container">
          <input type="checkbox" onChange={setFilter(!filter)} />
          {filter ? justMyGames : everyGame }
      </div>
    );
}
  
export default GameContainer;