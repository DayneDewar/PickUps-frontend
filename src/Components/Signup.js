import { useState } from "react";

function Signup({ changeLogin }) {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [age, setAge] = useState("")
    const [location, setLocation] = useState("")

    function changeFirstname(e) {
        setFirstname(e.target.value)
    }

    function changeLastname(e) {
        setLastname(e.target.value)
    }

    function changeAge(e) {
        setAge(e.target.value)
    }

    function changeLocation(e) {
        setLocation(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        const newAccount = {
            firstname,
            lastname,
            age,
            location,
            rating: 5
        }

        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAccount)
        })
        .then(r => r.json())
        .then(data => {
            changeLogin(data)
        })
    }

    return (
      <div >
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstname">First Name</label>
            <input type="text" name="firstname" onChange={changeFirstname} value={firstname} placeholder="ex. John"/>
            <label htmlFor="lastname">Last Name</label>
            <input type="text" name="lastname" onChange={changeLastname} value={lastname} placeholder="ex. Smith"/>
            <label htmlFor="age">Age</label>
            <input type="number" onChange={changeAge} value={age} placeholder="age"/>
            <label htmlFor="location">Current City</label>
            <input type="text" onChange={changeLocation} value={location} placeholder="ex. Brooklyn, NY"/>
            <button type="submit">Create Your Account</button>
          </form>
      </div>
    );
}
  
export default Signup;