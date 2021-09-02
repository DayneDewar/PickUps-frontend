import { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form, FormField } from 'semantic-ui-react';

function Login({ setUser }) {
    
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
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
            history.push("/")
        })
        .catch(error => {
            setErrors(error.errors)
        })
    }

    return (
      <div id="login-form" >
          <Form onSubmit={handleSubmit} style={{maxWidth:"25%", textAlign: "center", margin: "auto"}}>
            <h1>Login</h1> 
            {errors.map(error => <p key={error} style={{ color: "red" }}>{error}</p>)}
            <Form.Field>
            <label>Username</label>
            <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username"/>
            </Form.Field>
            <FormField>
            <label>Password</label>
            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
            </FormField>
            <Button type="submit">Login</Button>
          </Form>
      </div>
    );
}
  
export default Login;