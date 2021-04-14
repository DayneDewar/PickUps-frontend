import { useEffect, useState } from "react";

function Profile({ user, setCurrentUser }) {

  const [favSportsArr, setFavSportsArr] = useState([]);
  const [bio, setBio] = useState("")

  useEffect(() => {
    fetch(`http://localhost:3000/users/1`)
    .then(r => r.json())
    .then(data => {
      setFavSportsArr(data.favorite_sports)
      setBio(data.bio)
    })
  }, [])

  const userSports = favSportsArr?.map(favSport => {
    return ( 
      <li key={favSport.id}>
        {favSport.sport.name} - <button value={favSport.id} onClick={removeFavorite}>X</button>
      </li>
    )
  })

  function handleBioChange(e) {
    setBio(e.target.value)
  }

  function updateList(id) {
    const updatedSports = favSportsArr.filter(sport => sport.id !== parseInt(id))
    setFavSportsArr(updatedSports)
  }

  function handleSubmit(e) {
    e.preventDefault()

    fetch(`http://localhost:3000/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({bio: bio})
        })
        .then(r => r.json())
        .then(data => console.log(data))
  }

  function removeFavorite(e) {
    e.preventDefault()

    fetch(`http://localhost:3000/favorite_sports/${e.target.value}`, {
      method: "DELETE",
  })
    .then(r => r.json())
    .then(() => updateList(e.target.value))
  }

  function handleDelete(e) {
    e.preventDefault()

    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "DELETE",
     })
    .then(r => r.json())
    .then(() => setCurrentUser({}))
  }
    return (
      <div>
          <h2>Hello, {user.firstname}</h2>
          <p>{user.age} years old.</p>
          <p>{user.location}.</p>
          <h4>Bio:</h4>
          <p>{bio}</p> 
          <ul>
            {userSports}
          </ul>
          <h4> Rating: {user.rating}</h4>
          <form onSubmit={handleSubmit}>
            <textarea type="text" name="bio" onChange={handleBioChange} value={bio} placeholder="Lets Talk About you" />
            <button type="submit">Update Your Bio</button>
          </form>
          <button onClick={handleDelete}>Delete Account</button>
      </div>
    );
}
 
export default Profile;
  