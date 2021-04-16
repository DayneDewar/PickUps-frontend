import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addSport } from "../Redux/sportsSlice";

function NewSportForm({ user }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("");
    const [equipment, setEquipment] = useState("");
    const [image, setImage] = useState("");
    const [rules, setRules] = useState("");

    function handleSubmit(e) {
        e.preventDefault()

        const newSport = {
            name,
            equipment, 
            image,
            rules,
            user_id: user.id 
        }

        fetch('http://localhost:3000/sports', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSport)
        })
        .then(r => r.json())
        .then(data => {
            dispatch(addSport(data))
            history.push("/")
            setName("")
            setEquipment("")
            setImage("")
            setRules("")
        })
    }
    return (
      <div >
        <form onSubmit={handleSubmit} className="sport-form">
            <input  type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" />
            <input  type="text" name="equipment" onChange={(e) => setEquipment(e.target.value)} value={equipment} placeholder="Equipment" />
            <input  type="text" name="image" onChange={(e) => setImage(e.target.value)} value={image} placeholder="Insert Picture of Sport" />
            <input  type="textarea" name="rules" onChange={(e) => setRules(e.target.value)} value={rules} placeholder="Brief explanation of the rules" />
            <button type="submit">Create New Sport</button>
        </form>
      </div>
    );
}
  
export default NewSportForm;