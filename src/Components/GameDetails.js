import UpdateGameForm from "./UpdateGameForm"
import { useState } from "react"
import Map from "./Map"
function GameDetails({id, lati, long, user, users, sport }) {
    const [detailChange, setDetailChange] = useState(false)
    const [newLati, setNewLati] = useState(lati)
    const [newLong, setNewLong] = useState(long)
    const [signedUp, setSignedUp] = useState(false)

    const playersListing = users.map((player) => {
        return (
            <li key={player.id}>
                {player.firstname} {player.lastname} - Rating: {player.rating}
                <button id="like" value={player.id} onClick={handleRating}>👍🏾</button>
                <button id="dislike" value={player.id} onClick={handleRating}>👎🏾</button>
            </li>
        )
    })

    function handleRating(e) {
        if (e.target.id === "like") {
            fetch(`http://localhost:3000/users/${e.target.value}/player_rating`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({review: 10})
            })
            .then(r => r.json())
            .then(data => console.log(data))
        }
        else if (e.target.id === "dislike") {
            fetch(`http://localhost:3000/users/${e.target.value}/player_rating`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({review: 0})
            })
            .then(r => r.json())
            .then(data => console.log(data))
        }
    }

    function handleDetailChange() {
        setDetailChange(!detailChange)
    }

    function updateData(data) {
        setNewLati(data.lat)
        setNewLong(data.lng)
    }

    function handleCancel(e) {
        e.preventDefault()

        const deleteEvent = {
            user_id: user.id,
            event_id: id
        }
        fetch(`http://localhost:3000/cancel/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deleteEvent)
        })
        .then(r => r.json())
        .then(() => setSignedUp(!signedUp))
      }

      function handleSignUp(e) {
        e.preventDefault()

        const addEvent = {
            user_id: user.id,
            event_id: id
        }
        fetch(`http://localhost:3000/user_events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addEvent)
        })
        .then(r => r.json())
        .then(() => setSignedUp(!signedUp))
      }
    console.log(user)
    return (
      <div >
          <Map lati={newLati} long={newLong} />
          <h3>Players</h3>
          <ul>
              {playersListing}
          </ul>
          { user.id === users[0].id ? <button onClick={handleDetailChange}>Change Details</button> : null }
          { signedUp ? <button onClick={handleCancel}>Can't Make It?</button> : <button onClick={handleSignUp}>Sign Up To Play!</button> }
          { detailChange ? <UpdateGameForm id={id} updateData={updateData} /> : null}
      </div>
    );
}
  
export default GameDetails;