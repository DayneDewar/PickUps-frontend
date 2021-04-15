import { useEffect, useState } from "react";

function Profile({ user, setUser }) {

  const [favSportsArr, setFavSportsArr] = useState([]);
  const [bio, setBio] = useState("")

  // useEffect(() => {
  //   fetch('http://localhost:3000/me')
  //   .then(r => r.json())
  //   .then(data => {
  //     setFavSportsArr(data.favorite_sports)
  //   })
  // }, [])

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
    .then(() => updateList(e.target.value))
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
            <button type="submit">Update Your Bio</button>
          </form>
          <button onClick={handleDelete}>Delete Account</button>
      </div>
    );
}
 
export default Profile;
  