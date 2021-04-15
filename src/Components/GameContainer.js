import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGame } from "../Redux/gamesSlice";
import Game from "./Game";
import NewGameForm from "./NewGameForm";

function GameContainer({ user }) {
    // const [allGames, setAllGames] = useState([]);
    const [myGames, setMyGames] = useState([]);
    const [filter, setFilter] = useState(false);
    const allGames = useSelector(storeState => storeState.games)
    const dispatch = useDispatch()
    // useEffect(() => {
    //     fetch('http://localhost:3000/events')
    //     .then(r => r.json())
    //     .then(data => {
    //       setAllGames(data)
    //       // setMyGames(user.events)
    //     })
    // },[])

    // function removeFromGames(id) {
    //   const updatedGames = allGames.filter(game => game.id !== id)
    //   setAllGames(updatedGames)
    // }

    

    function sendNewGame(data) {
        dispatch(addGame(data))

        const newUserEvent = {
            user_id: user.id,
            event_id: data.id
        }

        fetch('http://localhost:3000/user_events', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserEvent)
        })
        .then(r => r.json())
        .then(data => {
          // const newUserGame = [...myGames, data]
          // setMyGames(newUserGame)
        })
    }

    // const filtered = allGames.filter(game => {
    //   return game.users.id === user.id
    // })


    const everyGame = allGames.map(game => {
        return (
          <Game 
            key={game.id}
            game={game}
            user={user}
          />
        )
    })

    const justMyGames = myGames?.map(game => {
       return ( 
          <Game 
            key={game.id}
            location={game.location}
            equipment={game.equipment}
            sport={game.sport}
            date={game.date}
            time={game.time}
            lat={game.lat}
            lng={game.lng}
            users={game.users}
            user={user}
          />
       )
    })

    return (
      <div className="game-container">
        <NewGameForm sendNewGame={sendNewGame} />
        <button onClick={() => setFilter(!filter)}>{filter ? "Show All PickUp Games" : "Just My PickUp Games"}</button>
        {filter ? justMyGames : everyGame}
      </div>
    );
}
  
export default GameContainer;