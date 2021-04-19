import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGame } from "../Redux/gamesSlice";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function NewGameForm({ user }) {

    const dispatch = useDispatch();
    const [location, setLocation] = useState("");
    const [equipment, setEquipment] = useState(false);
    const [sportId, setSportId] = useState(0);
    const [datetime, setDatetime] = useState(new Date());
    const sports = useSelector(storeState => storeState.sports);
    const allSportsName = sports.map(sport => {
        return <option key={sport.id} value={sport.id}>{sport.name}</option>
    })

    function handleSubmit(e) {
        e.preventDefault();

        const newGame = {
            location,
            equipment,
            datetime,
            sport_id: sportId,
            user_id: user.id
        }

        fetch('http://localhost:3000/events', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGame)
        })
        .then(r => r.json())
        .then(data => {
            dispatch(addGame(data))
            setLocation("")
        })
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
            <DatePicker 
            selected={datetime} 
            value={datetime} 
            onChange={setDatetime} 
            showTimeSelect 
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"/>
            <button type="submit">Create New Game</button>
        </form>
      </div>
    );
}
  
export default NewGameForm;