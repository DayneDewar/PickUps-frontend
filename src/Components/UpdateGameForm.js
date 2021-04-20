import { useState } from "react";
import { Button } from "semantic-ui-react";
function UpdateGameForm({ id, updateData }) {
    
    const [newLocation, setNewLocation] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");

    function updateGame(e) {
        e.preventDefault();
      
        const newDetails = {
            location: newLocation,
            date: newDate,
            time: newTime
        }

        fetch(`http://localhost:3000/events/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newDetails)
        })
        .then(r => r.json())
        .then(data => updateData(data))
    }    

    return (
      <div >
          <form onSubmit={updateGame} className="game-update-form">

            <input  type="text" name="location" onChange={(e) => setNewLocation(e.target.value)} value={newLocation} placeholder="location" />
            <Button type="submit">Update Game</Button>
        </form>
      </div>
    );
}
  
export default UpdateGameForm;
