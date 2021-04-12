import UpdateGameForm from "./UpdateGameForm"
import { useState } from "react"
import Map from "./Map"
function GameDetails({id, lati, long, user, users }) {
    
    const [detailChange, setDetailChange] = useState(false)

    function handleDetailChange() {
        setDetailChange(!detailChange)
    }

    console.log(user)
    return (
      <div >
          <Map lati={lati} long={long} />
          { user.id ? <button onClick={handleDetailChange}>Change Details</button> : null }
          { detailChange ? <UpdateGameForm id={id} /> : null}
      </div>
    );
}
  
export default GameDetails;