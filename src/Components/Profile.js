import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Card, Confirm, Form, List, Rating, Divider, Header } from "semantic-ui-react";

function Profile({ user, setUser }) {

  const history = useHistory()
  const [favSportsArr, setFavSportsArr] = useState([]);
  const [activeFriends, setActiveFriends] = useState([]);
  const [bio, setBio] = useState("");
  const [open, setOpen] = useState(false);

 useEffect(() => {
    const token = localStorage.getItem("token");

    fetch('http://localhost:3000/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
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
        setFavSportsArr(data.favorite_sports)
        setActiveFriends(data.accepted_friends)
      })
      .catch(error => console.log(error))
    }, [user])

  const userSports = favSportsArr?.map(favSport => {
    return ( 
      <List.Item key={favSport.id}  >
        <Header size="medium" color="grey">{favSport.sport.name} - <Button style={{float: "right"}} value={favSport.id} onClick={removeFavorite}>X</Button></Header>
      </List.Item>
    )
  })

  const friendsList = activeFriends?.map(friend => {
    return (
      <List.Item key={friend.id}>
        {friend.firstname} {friend.lastname}
      </List.Item>
    )
  })
  function handleBioChange(e) {
    setBio(e.target.value)
  }

  function updateList(id) {
    const updatedSports = favSportsArr.filter(sport => sport.id !== id)
    setFavSportsArr(updatedSports)
  }

  function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    fetch('http://localhost:3000/me', {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({bio: bio})
        })
        .then(r => r.json())
        .then(data => {
          setUser(data)
          setBio("") 
        })
  }

  function removeFavorite(e) {
    e.preventDefault();

    fetch(`http://localhost:3000/favorite_sports/${e.target.value}`, {
      method: "DELETE",
  })
    .then(r => r.json())
    .then((data) => updateList(data.id))
  }

  function handleDelete(e) {
    history.push("/")
    e.preventDefault();

    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "DELETE",
     })
    .then(r => r.json())
    .then(() => {
      setUser(null)
    })
  }
    return (
      <div >
        <Card style={{ width: "40vw", textAlign: "center", margin: "auto"}} >
        <Card.Content>
          <Card.Header style={{textAlign: "center"}} as="h1">Profile Info</Card.Header>
          {favSportsArr.length > 0 ? <Card.Header as="h2" style={{float: "right", marginTop: "auto", width: "fit-content"}} color="silver"> Favorite Sports</Card.Header> : null}
          <Card.Content>
          <Card.Header as="h3"style={{width: "fit-content"}} >{user.firstname} {user.lastname}</Card.Header>
          <List style={{float: "right"}}>
            {userSports}
          </List>
          <Card.Meta style={{width: "fit-content"}}>{user.location}</Card.Meta>
          <Card.Description style={{width: "fit-content", textAlign: "left"}}>
            <Card.Header as="h4" style={{width: "fit-content", marginTop: "1vw"}}>Rating: <Rating icon="star" defaultRating={user.rating} maxRating={user.rating}/></Card.Header>
            <Card.Header as="h4" >Bio:</Card.Header>
            {user.bio}
          </Card.Description>
          </Card.Content>
          </Card.Content>
          <Divider />
          <Card.Content>
            <Card.Header style={{textAlign: "center"}}> Edit Your Bio </Card.Header>
          <Form onSubmit={handleSubmit} >
            <Form.Field>
            <textarea style={{width: "100%"}}type="text" name="bio" onChange={handleBioChange} value={bio} placeholder="Lets Talk About you" />
            </Form.Field>
            <Button primary type="submit">Change</Button>
          </Form>
          <div style={{display: "relative", float: "right"}}>
            <Button style={{marginTop: "-5vw"}} secondary onClick={(e) => setOpen(true)}>Delete Account</Button>
            <Confirm 
            open={open}
            onCancel={(e) => setOpen(false)}
            onConfirm={handleDelete}>
            </Confirm>
          </div>
          </Card.Content>
          </Card>
          <Card style={{ width: "15vw", textAlign: "center", margin: "auto", }} >
            <Card.Content>
              <Card.Header>Friends List</Card.Header>
              <Card.Description>
                <List>
                  {friendsList}
                </List>
              </Card.Description>
            </Card.Content>
          </Card>
      </div>
    );
}
 
export default Profile;
  