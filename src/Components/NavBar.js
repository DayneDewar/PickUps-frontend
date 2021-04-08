import { NavLink } from "react-router-dom";

function NavBar() {
    return (
      <div id="nav-bar">
          <NavLink className="navlinks" to='/'>Home</NavLink>
          <NavLink className="navlinks" to='/MyProfile'>Profile</NavLink>
          <NavLink className="navlinks" to='/NewSport'>Make A New Sport</NavLink>
          <NavLink className="navlinks" to='/Games'>PickUp Games</NavLink>
      </div>
    );
}
  
export default NavBar;
  