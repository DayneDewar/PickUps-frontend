import { NavLink, useHistory } from "react-router-dom";

function NavBar({ user, setUser }) {
  const history = useHistory();

  function logout() {
    localStorage.removeItem("token");
    history.push("/")
    setUser(null)
  }
    return (
      <div id="nav-bar">
          <NavLink className="navlinks" to='/'>Home</NavLink>
          <NavLink className="navlinks" to='/Games'>PickUp Games</NavLink>
          { user ? (
            <>
              <NavLink className="navlinks" id="nav-account" to='/MyProfile'>Account</NavLink>
              <NavLink className="navlinks" to='/NewSport'>Make A New Sport</NavLink>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink className="navlinks" id="nav-login" to='/Login'>Login</NavLink>
              <NavLink className="navlinks" id="nav-signup" to='/Signup'>SignUp</NavLink>
            </>
          )}
          
      </div>
    );
}
  
export default NavBar;
  