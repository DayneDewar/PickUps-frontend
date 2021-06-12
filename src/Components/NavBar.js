import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Menu, Image, Button, Icon, Dropdown } from "semantic-ui-react";

function NavBar({ user, setUser, pending }) {
  const history = useHistory();

  function logout() {
    localStorage.removeItem("token");
    history.push("/")
    setUser(null)
  }

  // setTimeout(function() {console.log(user.pending_friends)}, 3000)
  const friendNotifications = pending?.map( friend => {
    return (
      <Dropdown.Item key={friend.id} onClick> 
        {friend.firstname} {friend.lastname} has sent you a friend request!
      </Dropdown.Item>
    )
  })
  

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
            {/* <Menu.Item>
              <Button baic icon onClick={requests}>
                Requests
              </Button>
            </Menu.Item> */}
            {/* <Dropdown text="Notifications">
              <Dropdown.Menu>
                {friendNotifications}
              </Dropdown.Menu>
            </Dropdown> */}
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
  