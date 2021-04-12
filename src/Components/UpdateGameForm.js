import { useState } from "react";
function UpdateGameForm({ id, updateData }) {
    
    const [newLocation, setNewLocation] = useState("")
    const [newDate, setNewDate] = useState("")
    const [newTime, setNewTime] = useState("")

    function handleLocationChange(e) {
        setNewLocation(e.target.value)
    }

    function updateGame(e) {

        const newDetails = {
            location: newLocation
        }

        e.preventDefault()
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
            <input  type="text" name="location" onChange={handleLocationChange} value={newLocation} placeholder="location" />
            <button type="submit">Update Game</button>
        </form>
      </div>
    );
}
  
export default UpdateGameForm;
