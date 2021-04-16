import { useState } from "react";
import { useHistory } from "react-router";

function Login({ setUser }) {
    
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

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
            <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} />
            <label>Password</label>
            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button type="submit">Login</button>
          </form>
      </div>
    );
}
  
export default Login;