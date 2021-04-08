import { useState } from "react";

function NewGameForm({ sendNewGame }) {
    const [location, setLocation] = useState("")
    const [equipment, setEquipment] = useState(false)

    function handleEquipmentChange(e) {
        setEquipment(!equipment)
    }
    function handleLocationChange(e) {
        setLocation(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newGame = {
            location: location, 
            equipment: true,
            sport_id: 1
        }

        fetch('http://localhost:3000/events', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGame)
        })
        .then(r => r.json())
        .then(data => sendNewGame(data))
    }

    return (
      <div >
        <form onSubmit={handleSubmit}>
        <input  type="text" name="location" onChange={handleLocationChange} value={location} placeholder="location" />
        <input  type="checkbox" name="equipment" onChange={handleEquipmentChange} value={equipment} />
        <button type="submit">Create New Game</button>
        </form>
      </div>
    );
}
  
export default NewGameForm;