import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button, Form, Label } from "semantic-ui-react";
import { addSport } from "../Redux/sportsSlice";

function NewSportForm({ user }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("");
    const [equipment, setEquipment] = useState("");
    const [image, setImage] = useState("");
    const [rules, setRules] = useState("");
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);

    function handleSubmit(e) {
        e.preventDefault()
        setLoad(true)

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
      <div style={{display: "block", margin: "auto"}}>
        <Form onSubmit={handleSubmit} loading={load} style={{maxWidth:"40%", textAlign: "center", margin: "auto", }}>
            <h1> Create A New Sport </h1>
            <Form.Group widths="equal">
            <Form.Input  style={{ }} type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" />
            <Form.Input  type="text" name="equipment" onChange={(e) => setEquipment(e.target.value)} value={equipment} placeholder="Equipment" />
            </Form.Group>
            <Form.Input  width type="text" name="image" onChange={(e) => setImage(e.target.value)} value={image} placeholder="Insert Picture of Sport" />
            <Form.Input  height={6} type="textArea" name="rules" onChange={(e) => setRules(e.target.value)} value={rules} placeholder="Brief explanation of the rules" />
            <Button type="submit">Create New Sport</Button>
        </Form>
      </div>
    );
}
  
export default NewSportForm;