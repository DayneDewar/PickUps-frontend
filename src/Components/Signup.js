import { useState } from "react";
import { useHistory } from "react-router";

function Signup({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [location, setLocation] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    function changeUsername(e) {
        setUsername(e.target.value)
    }

    function changePassword(e) {
        setPassword(e.target.value)
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
            username,
            password,
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
            <label>Username</label>
            <input type="text" name="username" onChange={changeUsername} value={username} />
            <label>Password</label>
            <input type="password" name="password" onChange={changePassword} value={password} />
            <label>Age</label>
            <input type="number" onChange={changeAge} value={age} />
            <label>Current City</label>
            <input type="text" onChange={changeLocation} value={location} placeholder="ex. Brooklyn, NY"/>
            <button type="submit">Sign Up</button>
          </form>
      </div>
    );
}
  
export default Signup;