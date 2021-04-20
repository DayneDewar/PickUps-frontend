import { useEffect, useState } from "react";
import { Button, Confirm } from "semantic-ui-react";

function Profile({ user, setUser }) {
  const [favSportsArr, setFavSportsArr] = useState([]);
  const [bio, setBio] = useState("");
  const [open, setOpen] = useState(false)

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
        setUser(data)
        setFavSportsArr(data.favorite_sports)
      })
      .catch(error => console.log(error))
    }, [])

  const userSports = favSportsArr?.map(favSport => {
    return ( 
      <li key={favSport.id}>
        {favSport.sport.name} - <Button value={favSport.id} onClick={removeFavorite}>X</Button>
      </li>
    )
  })

  function handleBioChange(e) {
    setBio(e.target.value)
  }

  function updateList(id) {
    const updatedSports = user.favorite_sports.filter(sport => sport.id !== id)
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
    e.preventDefault();

    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "DELETE",
     })
    .then(r => r.json())
    .then(() => setUser(null))
  }
    return (
      <div>
          <h2>Hello, {user.firstname}</h2>
          {/* <h1>{mydate.toDateString}</h1> */}
          <p>{user.age} years old.</p>
          <p>{user.location}.</p>
          <h4>Bio:</h4>
          <p>{user.bio}</p> 
          <ul>
            {userSports}
          </ul>
          <h4> Rating: {user.rating}</h4>
          <form onSubmit={handleSubmit}>
            <label>Change Bio</label>
            <textarea type="text" name="bio" onChange={handleBioChange} value={bio} placeholder="Lets Talk About you" />
            <Button primary type="submit">Update Your Bio</Button>
          </form>
          <div>
            <Button secondary onClick={(e) => setOpen(true)}>Delete Account</Button>
            <Confirm 
            open={open}
            onCancel={(e) => setOpen(false)}
            onConfirm={handleDelete}>
            </Confirm>
          </div>
      </div>
    );
}
 
export default Profile;
  