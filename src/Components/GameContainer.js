import { useSelector } from "react-redux";
import { Card } from "semantic-ui-react";
import Game from "./Game";
import NewGameForm from "./NewGameForm";

function GameContainer({ user }) {
    // const [allGames, setAllGames] = useState([]);
    // const [filter, setFilter] = useState(false);
    const allGames = useSelector(storeState => storeState.games);
    console.log(allGames, user)
    // useEffect(() => {
      
    // }, [])

    // const filtered = allGames.filter(game => {
    //   if (filter) {
    //     return game.users[0].id === user.id
    //   }
    //   else {
    //     return game
    //   }
    // })

    const everyGame = allGames.map(game => {
        return (
          <Game 
            key={game.id}
            game={game}
            user={user}
            host={(game.users[0]?.id === user?.id)}
          />
        )
    })

    return (
      <div className="game-container" style={{textAlign: "center"}}>
        <NewGameForm user={user} />
        <Card.Group centered itemsPerRow={4} style={{magrin: "auto", overflow: "auto", paddingTop: "1rem"}}>
          {everyGame}
        </Card.Group>
      </div>
    );
}
  
export default GameContainer;