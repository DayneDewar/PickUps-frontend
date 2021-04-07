import { NavLink } from "react-router-dom";

function NavBar() {
    return (
      <div >
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/MyProfile'>Profile</NavLink>
          <NavLink to='/NewEvent'>Host a PickUp Game</NavLink>
          <NavLink to='/MyGames'>PickUp Games</NavLink>
      </div>
    );
}
  
export default NavBar;
  