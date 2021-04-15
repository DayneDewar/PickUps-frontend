import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addSport } from "../Redux/sportsSlice";

function NewSportForm({ user }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [equipment, setEquipment] = useState("");
    const [image, setImage] = useState("");
    const [rules, setRules] = useState("");
    const history = useHistory();

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleEquipmentChange(e) {
        setEquipment(e.target.value)
    }

    function handleImageChange(e) {
        setImage(e.target.value)
    }

    function handleRulesChange(e) {
        setRules(e.target.value)
    }

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
            <input  type="text" name="name" onChange={handleNameChange} value={name} placeholder="Name" />
            <input  type="text" name="equipment" onChange={handleEquipmentChange} value={equipment} placeholder="Equipment" />
            <input  type="text" name="image" onChange={handleImageChange} value={image} placeholder="Insert Picture of Sport" />
            <input  type="textarea" name="rules" onChange={handleRulesChange} value={rules} placeholder="Brief explanation of the rules" />
            <button type="submit">Create New Sport</button>
        </form>
      </div>
    );
}
  
export default NewSportForm;