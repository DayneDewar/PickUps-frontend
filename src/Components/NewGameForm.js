import { useState } from "react";

function NewGameForm({ sendNewGame, sports }) {
    const [location, setLocation] = useState("")
    const [equipment, setEquipment] = useState(false)
    const [sportId, setSportId] = useState(1)

    const allSportsName = sports.map(sport => {
        return <option key={sport.id} value={sport.id}>{sport.name}</option>
    })

    function handleEquipmentChange(e) {
        setEquipment(!equipment)
    }

    function handleSportChange(e) {
        setSportId(e.target.value)
    }

    function handleLocationChange(e) {
        setLocation(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newGame = {
            location: location, 
            equipment: equipment,
            sport_id: sportId
        }

        fetch('http://localhost:3000/events', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGame)
        })
        .then(r => r.json())
        .then(data => console.log(data))
    }

    return (
      <div >
        <form onSubmit={handleSubmit} className="game-form">
            <select type="text" name="sports" onChange={handleSportChange}>
                {allSportsName}
            </select>
            <input  type="text" name="location" onChange={handleLocationChange} value={location} placeholder="location" />
            <label htmlFor="equipment">Do You Have The Equipment</label>
            <input  type="checkbox" name="equipment" onChange={handleEquipmentChange} value={equipment}/>
            <button type="submit">Create New Game</button>
        </form>
      </div>
    );
}
  
export default NewGameForm;