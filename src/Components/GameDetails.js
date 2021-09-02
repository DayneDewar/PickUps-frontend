import UpdateGameForm from "./UpdateGameForm"
import { useState } from "react"
import Map from "./Map"
import { useDispatch } from "react-redux"
import { removeGame, updateGamePlayers, addGamePlayers, removeGamePlayers } from "../Redux/gamesSlice";
import { Modal, Button, Header, List } from "semantic-ui-react";

function GameDetails({ game, user, host }) {
    
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [signedUp, setSignedUp] = useState(user.events.some((event) => event.id === game.id) || host)
    const [newLati, setNewLati] = useState(game.lat);
    const [newLong, setNewLong] = useState(game.lng);
    const [playersArr, setPlayersArr] = useState(game.users);

    const playersListing = playersArr.map((player) => {
        return (
            <List.Item key={player.id}>
                {/* { host ? <p>[HOST]</p> : null } */}
                {player.firstname} {player.lastname} - Rating: {player.rating}
                <Button id="like" value={player.id} onClick={handleRating}>👍🏾</Button>
                <Button id="dislike" value={player.id} onClick={handleRating}>👎🏾</Button>
                {player.id === user.id ? null : <Button id="frined" value={player.id} onClick={addPlayerAsFriend}> Add as Friend </Button>}
            </List.Item>
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

    function addPlayerAsFriend(e) {
        e.preventDefault();

        const newFriend = {
            user_id: user.id,
            added_user_id: e.target.value
        }

        fetch(`http://localhost:3000/add_friend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFriend)
        })
        .then(r => r.json())
        .then(data => alert('You just added a friend'))
    }

    function updateData(data) {
        // Update redux
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
            setSignedUp(false)
            dispatch(removeGamePlayers([game, user]))
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

      return (
        <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={<Button color="twitter">Show Details</Button>}>
            <Modal.Header style={{fontSize: "large"}} >{game.sport.name}  <Button style={{position: "relative", top: "-7px" }} color="black" floated="right" onClick={(e) => setOpen(false)}>Close</Button></Modal.Header>
            <Modal.Content style={{ height:"24vw", overflow: "auto"}} > 
            { host ? <Header style={{position: "relative", top: "-.75vw", height:"0vw"}} textAlign="center" color="red">[HOST]</Header> : null}
            <Map lati={newLati} long={newLong} />
            <Modal.Description style={{overflow: "auto"}}>
                <Header textAlign="center">Location</Header>
                <p style={{textAlign: "center"}}>{game.location}</p>
                <Header textAlign="center" >Equipment Available</Header>
                <p style={{textAlign: "center"}}>{game.equipment ? "✅" : "❌"}</p>
                <Header textAlign="center" >Players</Header>
                <List animated verticalAlign="middle">
                    {playersListing}
                </List>
        </Modal.Description >
          </Modal.Content>
          <Modal.Actions style={{ height:"4vw", display: "flex"}}>
          { signedUp ? <Button floated="left" onClick={handleCancel}>Can't Make It?</Button> : <Button color="olive" floated="left" onClick={handleSignUp}>Sign Up To Play!</Button> }
          { host ? <UpdateGameForm game={game} updateData={updateData} /> : null}
          { host ? <Button floated="right" color="red" onClick={handleDelete}>Cancel The Event</Button> : null}
          </Modal.Actions>
      </Modal>
    );
}
  
export default GameDetails;