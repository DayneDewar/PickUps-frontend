import UpdateGameForm from "./UpdateGameForm"
import { useState } from "react"
import Map from "./Map"
import { useDispatch } from "react-redux"
import { removeGame, updateGamePlayers, addGamePlayers } from "../Redux/gamesSlice";

function GameDetails({ game, user, host, signedUp, setSignedUp }) {
    
    const dispatch = useDispatch();
    const [newLati, setNewLati] = useState(game.lat);
    const [newLong, setNewLong] = useState(game.lng);
    const [showUpdate, setShowUpdate] = useState(false);
    const [playersArr, setPlayersArr] = useState(game.users);

    const playersListing = playersArr.map((player) => {
        return (
            <li key={player.id}>
                {/* { host ? <p>[HOST]</p> : null } */}
                {player.firstname} {player.lastname} - Rating: {player.rating}
                <button id="like" value={player.id} onClick={handleRating}>👍🏾</button>
                <button id="dislike" value={player.id} onClick={handleRating}>👎🏾</button>
            </li>
        )
    })

    function renderReview(data) {
        const newPlayerArr = playersArr.map((player) => {
            if (player.id === parseInt(data.id)) {
                return data
            }
            else return player
        })
        setPlayersArr(newPlayerArr)
        console.log(newPlayerArr)
        dispatch(updateGamePlayers([game, data]))
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
        } else if (e.target.id === "dislike") {
            fetch(`http://localhost:3000/users/${e.target.value}/player_rating`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({review: 0})
            })
            .then(r => r.json())
            .then(data => renderReview(data))
        }
    }

    function updateData(data) {
        setNewLati(data.lat)
        setNewLong(data.lng)
    }

    function handleCancel(e) {
        e.preventDefault();

        const deleteEvent = {
            user_id: user.id,
            event_id: game.id
        }
        fetch('http://localhost:3000/cancel/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deleteEvent)
        })
        .then(r => r.json())
        .then(data => {
            const removePlayer = playersArr.filter(player => player.id !== user.id)
            setPlayersArr(removePlayer)
            console.log(data)
            setSignedUp(false)
        })
      }

      function handleSignUp(e) {
        e.preventDefault();

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
        .then(data => {
            const addPlayer = [...playersArr, user]
            setPlayersArr(addPlayer)
            setSignedUp(true)
            dispatch(addGamePlayers([game, user]))
        })
      }

      function handleDelete(e) {
          e.preventDefault();

          fetch(`http://localhost:3000/events/${game.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
          })
          .then(r => r.json())
          .then(() => {
              dispatch(removeGame(game))
        })
      }
console.log(game)
    return (
      <div >
          <Map lati={newLati} long={newLong} />
          <h3>Players</h3>
          <ul>
              {playersListing}
          </ul>
          { host ? <button onClick={(e) => setShowUpdate(!showUpdate)}>Change Details</button> : null }
          { signedUp ? <button onClick={handleCancel}>Can't Make It?</button> : <button onClick={handleSignUp}>Sign Up To Play!</button> }
          { showUpdate ? <UpdateGameForm id={game.id} updateData={updateData} /> : null}
          { showUpdate ? <button onClick={handleDelete}>Cancel The Event</button> : null}
      </div>
    );
}
  
export default GameDetails;