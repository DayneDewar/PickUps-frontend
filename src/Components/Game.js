import { useState } from "react";
import GameDetails from "./GameDetails"

function Game({ location, equipment, id, sport, date, time, lat, lng, users, user }) {

  const [details, setDetails] = useState(false)

  console.log(id)
  function handleCancel(e) {
    e.preventDefault()
    //not Dynamic
    fetch(`http://localhost:3000/user_events/1`, {
      method: "DELETE"
    })
    .then(r => r.json())
    // .then(() => handleRemoveEvent())
  }

  function showDetails() {
    setDetails(!details)
  }
    return (
      <div className="game-card">
        <h2>{sport}</h2>
        <p>Players: {users?.length}</p>
        <p>Location: {location}</p>
        <p>Equipment Available: { equipment ? "✅" : "❌"}</p>
        <button onClick={handleCancel}>Can't make it?</button>
        <button onClick={showDetails}>Show PickUp Details</button>
        { details ? <GameDetails lati={lat} long={lng} id={id} user={user} users={users}/> : null }
      </div>
    );
}
  
export default Game;