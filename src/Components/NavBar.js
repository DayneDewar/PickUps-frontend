import { NavLink, useHistory } from "react-router-dom";
import { Menu, Button, Icon, Dropdown } from "semantic-ui-react";
import Notifications from "./Notifications";

function NavBar({ user, setUser, pending, setPending }) {
  const history = useHistory();

  function logout() {
    localStorage.removeItem("token");
    history.push("/")
    setUser(null)
  }

    return (
        <Menu stackable style={{margin: '0rem'}}>
          <Menu.Item>
            <NavLink className="navlinks" to='/'>Home</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink className="navlinks" to='/Games'>PickUp Games</NavLink>
          </Menu.Item>
          <Menu.Item >
              <Dropdown icon='bell blue'>
                <Dropdown.Menu>
                  <Notifications user={user} pending={pending} setPending={setPending}/>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          { user ? (
            <>
            <Menu.Item>
              <NavLink className="navlinks" to='/NewSport'>Make A New Sport</NavLink>
            </Menu.Item>

            <Menu.Item position='right'>
              <NavLink color="green" basic='true' icon='true' className="navlinks" id="nav-account" to='/MyProfile'>
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
                <NavLink color="green" basic='true' icon='true' className="navlinks" id="nav-login" to='/Login'>Login</NavLink>
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
  