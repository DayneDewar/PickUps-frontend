import { useState } from "react";
import { Button, Form, FormField, Input } from "semantic-ui-react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function UpdateGameForm({ game, updateData }) {
    
    const [newLocation, setNewLocation] = useState("");
    const [newDatetime, setNewDatetime] = useState(new Date());

    function updateGame(e) {
      
        const newDetails = {
            location: newLocation
        }

        fetch(`http://localhost:3000/events/${game.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newDetails)
        })
        .then(r => r.json())
        .then(data => {
          updateData(data)
          setNewLocation("")
        })

    }    

    return (
        <Form onSubmit={updateGame} className="game-update-form" style={{paddingLeft: "7vw"}}>
          {/* <DatePicker 
            selected={newDatetime} 
            value={newDatetime} 
            onChange={setNewDatetime} 
            showTimeSelect 
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"/> */}
            <Form.Field inline>
              <label>Change Location</label>
              <input style={{width: "12vw", height:"2.15vw"}} type="text" name="location" onChange={(e) => setNewLocation(e.target.value)} value={newLocation} placeholder="location" />            
            <Button color="twitter"type="submit">Update Game</Button>
            </Form.Field>
        </Form>
    );
}
  
export default UpdateGameForm;
