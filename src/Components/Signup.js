import { useState } from "react";
import { useHistory } from "react-router";

function Signup({ setUser }) {
    
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [location, setLocation] = useState("");
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault()

        const newAccount = {
            username,
            password,
            firstname,
            lastname,
            age,
            location,
            rating: 5
        }

        fetch('http://localhost:3000/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAccount)
        })
        .then(r => {
            return r.json().then(data => {
                if (r.ok) {
                    return data
                } else {
                    throw data
                }
            })
        })
        .then(data => {
            const { user, token } = data
            localStorage.setItem("token", token)
            setUser(user)
            history.push("/MyProfile")
        })
        .catch(error => {
            setErrors(error.errors)
        })
    }

    return (
      <div id="signup-form">
          <form onSubmit={handleSubmit}>
            <h1>Create Your Account</h1>
            {errors.map(error => <p key={error} style={{ color: "red" }}>{error}</p>)}
            <label>First Name</label>
            <input type="text" name="firstname" onChange={(e) => setFirstname(e.target.value)} value={firstname} />
            <label>Last Name</label>
            <input type="text" name="lastname" onChange={(e) => setLastname(e.target.value)} value={lastname} />
            <label>Username</label>
            <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} />
            <label>Password</label>
            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <label>Age</label>
            <input type="number" onChange={(e) => setAge(e.target.value)} value={age} />
            <label>Current City</label>
            <input type="text" onChange={(e) => setLocation(e.target.value)} value={location} placeholder="ex. Brooklyn, NY"/>
            <button type="submit">Sign Up</button>
          </form>
      </div>
    );
}
  
export default Signup;