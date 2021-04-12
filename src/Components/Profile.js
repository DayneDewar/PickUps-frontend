import { useEffect } from "react";

function Profile({ user }) {

  const userSports = user.favorite_sports?.map(favSport => {
    console.log(favSport.sport)
    return ( 
      <li key={favSport.id}>{favSport.sport.name}</li>
    )
  })

  useEffect(() => {
    fetch(`http://localhost:3000/users/${user.id}`)
    .then(r => r.json())
    .then(data => console.log(data))
  }, [user.id])

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
      </div>
    );
}
 
export default Profile;
  