import UpdateGameForm from "./UpdateGameForm"
import { useState } from "react"
import Map from "./Map"

function GameDetails({ game, user, removeFromGames }) {
    const [detailChange, setDetailChange] = useState(false)
    const [newLati, setNewLati] = useState(game.lati)
    const [newLong, setNewLong] = useState(game.long)
    const [signedUp, setSignedUp] = useState(false)
    const [playersArr, setPlayersArr] = useState(game.users)

    const playersListing = playersArr.map((player) => {
        return (
            <li key={player.id}>
                {player.firstname} {player.lastname} - Rating: {player.rating}
                <button id="like" value={player.id} onClick={handleRating}>👍🏾</button>
                <button id="dislike" value={player.id} onClick={handleRating}>👎🏾</button>
            </li>
        )
    })

    function renderReview(data) {
        const newPlayerArr = playersArr.map((player) => {
            if (player.id === data.id) {
                player.rating = data.rating
                return player
            }
            else return player
        })
        setPlayersArr(newPlayerArr)
    }

    function handleRating(e) {
        e.preventDefault(); 

        if (e.target.id === "like") {
            fetch(`http://localhost:3000/users/${e.target.value}/player_rating`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({review: 10})
            })
            .then(r => r.json())
            .then(data => renderReview(data) )
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
            .then(data =>renderReview(data))
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
            event_id: game.id
        }
        fetch(`http://localhost:3000/cancel/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deleteEvent)
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setSignedUp(!signedUp)
        })
      }

      function handleSignUp(e) {
        e.preventDefault()

        const addEvent = {
            user_id: user.id,
            event_id: game.id
        }
        fetch(`http://localhost:3000/user_events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addEvent)
        })
        .then(r => r.json())
        .then(data => console.log(data))
      }

      function handleDelete(e) {
          e.preventDefault();

          handleCancel(e)

          fetch(`http://localhost:3000/events/${game.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
          })
          .then(r => r.json())
          .then(() => removeFromGames(game.id))
      }

    return (
      <div >
          <Map lati={newLati} long={newLong} />
          <h3>Players</h3>
          <ul>
              {playersListing}
          </ul>
          { user.id === game.users[0].id ? <button onClick={handleDetailChange}>Change Details</button> : null }
          { signedUp ? <button onClick={handleCancel}>Can't Make It?</button> : <button onClick={handleSignUp}>Sign Up To Play!</button> }
          { detailChange ? <UpdateGameForm id={game.id} updateData={updateData} /> : null}
          { true ? <button onClick={handleDelete}>Cancel The Event</button> : null}
      </div>
    );
}
  
export default GameDetails;