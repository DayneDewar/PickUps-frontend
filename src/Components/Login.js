import {useState} from "react";
function Login({changeLogin }) {
    
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")

    function changeFirstname(e) {
        setFirstname(e.target.value)
    }

    function changeLastname(e) {
        setLastname(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        const newLogin = {
            firstname,
            lastname
        }
        fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLogin)
        })
        .then(r => r.json())
        .then(data => changeLogin(data))
        }

    return (
      <div >
          <form onSubmit={handleSubmit}> 
            <label htmlFor="firstname">First Name</label>
            <input type="text" name="firstname"onChange={changeFirstname} value={firstname} placeholder="ex. John"/>
            <label htmlFor="lastname">Last Name</label>
            <input type="text" name="lastname"onChange={changeLastname} value={lastname} placeholder="ex. Smith"/>
            <button type="submit">Login</button>
          </form>
      </div>
    );
}
  
export default Login;