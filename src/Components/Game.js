import { useState } from "react";
import GameDetails from "./GameDetails"

function Game({ game, user, host }) {

  const [details, setDetails] = useState(false)
  const [signedUp, setSignedUp] = useState(null)

  function findSignedUp(e) {
    setDetails(!details)
    const checkIfSignedUp = game.users.some(player => player.id === user.id)
    setSignedUp(checkIfSignedUp)
  }

    return (
      <div className="game-card">
        <h2>{game.sport.name}</h2>
        <p>Players: {game.users?.length}</p>
        <p>Location: {game.location}</p>
        <p>Equipment Available: { game.equipment ? "✅" : "❌"}</p>
        <button onClick={findSignedUp}>{ details ? "Hide Details" : "Show PickUp Details"}</button>
        { details ? <GameDetails game={game} user={user} host={host} signedUp={signedUp} setSignedUp={setSignedUp} /> : null }
      </div>
    );
}
  
export default Game;