import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGame } from "../Redux/gamesSlice";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Checkbox, Form, Header, Segment } from "semantic-ui-react";

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
        console.log(location)
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
      <Segment style={{width: "50vw", margin:"auto", backgroundColor: "silver", marginTop: '1vw'}} >
        <Form onSubmit={handleSubmit} className="game-form" style={{margin: "auto"}}>
            <Header as="h2">Host A PickUp Game</Header>
            <Form.Group inline >
                <Form.Field>
            <select  type="text" name="sports" onChange={(e) => setSportId(e.target.value)}>
                <option value="0">Select A Sport</option>
                {allSportsName}
            </select>
            </Form.Field>
            <Form.Field>
            <Form.Input  type="text" name="location" onChange={(e) => setLocation(e.target.value)} value={location} placeholder="location" />
            </Form.Field>
            <Form.Field control={Checkbox} label={{ children: 'Do You Have The Equipment?'}} onChange={(e) => setEquipment(!equipment)}/>
            <Form.Field >
            <DatePicker 
            selected={datetime} 
            value={datetime} 
            onChange={setDatetime} 
            showTimeSelect 
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"/>
            </Form.Field>
            <Button type="submit">Create New Game</Button>
            </Form.Group>
        </Form>
    </Segment>
    );
}
  
export default NewGameForm;