import { useState } from "react";
import DatePicker from 'react-date-picker';
import { useSelector } from "react-redux";
import TimePicker from 'react-time-picker';

function NewGameForm({ sendNewGame }) {

    const [location, setLocation] = useState("");
    const [equipment, setEquipment] = useState(false);
    const [sportId, setSportId] = useState(0);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('10:00');
    const sports = useSelector(storeState => storeState.sports);
    const allSportsName = sports.map(sport => {
        return <option key={sport.id} value={sport.id}>{sport.name}</option>
    })

    function handleSubmit(e) {
        e.preventDefault();

        const newGame = {
            location,
            equipment,
            date,
            time,
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
        .then(data => sendNewGame(data))
    }

    return (
      <div >
        <form onSubmit={handleSubmit} className="game-form">
            <select type="text" name="sports" onChange={(e) => setSportId(e.target.value)}>
                <option value="0">Select A Sport</option>
                {allSportsName}
            </select>
            <input  type="text" name="location" onChange={(e) => setLocation(e.target.value)} value={location} placeholder="location" />
            <label htmlFor="equipment">Do You Have The Equipment</label>
            <input  type="checkbox" name="equipment" onChange={(e) => setEquipment(!equipment)} value={equipment} />
            <label htmlFor="date">Date</label>
            <DatePicker value={date} onChange={setDate} />
            <TimePicker value={time} onChange={setTime} />
            <button type="submit">Create New Game</button>
        </form>
      </div>
    );
}
  
export default NewGameForm;