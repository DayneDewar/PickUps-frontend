import { NavLink, useHistory } from "react-router-dom";
import { Menu, Image, Button, Icon } from "semantic-ui-react";

function NavBar({ user, setUser }) {
  const history = useHistory();

  function logout() {
    localStorage.removeItem("token");
    history.push("/")
    setUser(null)
  }
    return (
        <Menu color="purple">
          <Menu.Item>
            <NavLink className="navlinks" to='/'>Home</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink className="navlinks" to='/Games'>PickUp Games</NavLink>
          </Menu.Item>
          { user ? (
            <>
            <Menu.Item>
              <NavLink className="navlinks" to='/NewSport'>Make A New Sport</NavLink>
            </Menu.Item>
            <Menu.Item position="right">
              <NavLink color="green" basic icon className="navlinks" id="nav-account" to='/MyProfile'>
                <Icon name="user"></Icon>
                Account</NavLink>
            </Menu.Item>
            <Menu.Item >
              <Button color="red" basic icon onClick={logout}>
                <Icon name="log out"></Icon>
                Logout
              </Button>
            </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item position="right">
                <NavLink color="green" basic icon className="navlinks" id="nav-login" to='/Login'>Login</NavLink>
              </Menu.Item>
              <Menu.Item >
                <NavLink className="navlinks" id="nav-signup" to='/Signup'>SignUp</NavLink>
              </Menu.Item>
            </>
          )}
          </Menu>
    );
}
  
export default NavBar;
  