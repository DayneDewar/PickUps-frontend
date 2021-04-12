import { NavLink } from "react-router-dom";

function NavBar() {


    return (
      <div id="nav-bar">
          <NavLink className="navlinks" to='/'>Home</NavLink>
          <NavLink className="navlinks" id="nav-account" to='/MyProfile'>Account</NavLink>
          <NavLink className="navlinks" to='/NewSport'>Make A New Sport</NavLink>
          <NavLink className="navlinks" to='/Games'>PickUp Games</NavLink>
          <NavLink className="navlinks" id="nav-login" to='/Login'>Login</NavLink>
          <NavLink className="navlinks" id="nav-signup" to='/Signup'>SignUp</NavLink>
      </div>
    );
}
  
export default NavBar;
  