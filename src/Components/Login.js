import { useState } from "react";
import { useHistory } from "react-router";

function Login({ setUser }) {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    function changeUsername(e) {
        setUsername(e.target.value)
    }

    function changePassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newLogin = {
            username,
            password
        }

        fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newLogin)
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
      <div id="login-form">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1> 
            {errors.map(error => <p key={error} style={{ color: "red" }}>{error}</p>)}
            <label>Username</label>
            <input type="text" name="username" onChange={changeUsername} value={username} />
            <label>Password</label>
            <input type="password" name="password" onChange={changePassword} value={password} />
            <button type="submit">Login</button>
          </form>
      </div>
    );
}
  
export default Login;