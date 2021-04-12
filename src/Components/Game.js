import { useState } from "react";
import GameDetails from "./GameDetails"

function Game({ location, equipment, id, sport, date, time, lat, lng, users, user }) {

  const [details, setDetails] = useState(false)


  function showDetails() {
    setDetails(!details)
  }
    return (
      <div className="game-card">
        <h2>{sport.name}</h2>
        <p>Players: {users?.length}</p>
        <p>Location: {location}</p>
        <p>Equipment Available: { equipment ? "✅" : "❌"}</p>
        <button onClick={showDetails}>Show PickUp Details</button>
        { details ? <GameDetails lati={lat} long={lng} id={id} user={user} users={users} sport={sport}/> : null }
      </div>
    );
}
  
export default Game;