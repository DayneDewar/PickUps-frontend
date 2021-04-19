import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGame } from "../Redux/gamesSlice";
import Game from "./Game";
import NewGameForm from "./NewGameForm";

function GameContainer({ user }) {
    // const [allGames, setAllGames] = useState([]);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState(false);
    const allGames = useSelector(storeState => storeState.games);
    
    useEffect(() => {
      
    }, [])

    const filtered = allGames.filter(game => {
      if (filter) {
        return game.users[0].id === user.id
      }
      else {
        return game
      }
    })

    const everyGame = allGames.map(game => {
        return (
          <Game 
            key={game.id}
            game={game}
            user={user}
            host={(game.users[0].id === user?.id)}
          />
        )
    })

    return (
      <div className="game-container">
        <NewGameForm user={user} />
        <button onClick={(e) => setFilter(!filter)}>{filter ? "Show All PickUp Games" : "Just My PickUp Games"}</button>
        {everyGame}
      </div>
    );
}
  
export default GameContainer;