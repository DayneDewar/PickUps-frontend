import { useState } from "react";
import GameDetails from "./GameDetails"

function Game({ game, user }) {

  const [details, setDetails] = useState(false)

  function showDetails() {
    setDetails(!details)
  }
    return (
      <div className="game-card">
        <h2>{game.sport.name}</h2>
        <p>Players: {game.users?.length}</p>
        <p>Location: {game.location}</p>
        <p>Equipment Available: { game.equipment ? "✅" : "❌"}</p>
        <button onClick={showDetails}>Show PickUp Details</button>
        { details ? <GameDetails game={game} user={user} /> : null }
      </div>
    );
}
  
export default Game;