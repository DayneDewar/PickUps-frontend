
function Sport({ name, equipment, image="../default_sport.jpg", rules, id, user}) {
    
  function addSport(e) {
    e.preventDefault();

    const newFavorite = {
      //using user id of 1 for now until incorporating redux
      user_id: user.id,
      sport_id: id
    }

    fetch('http://localhost:3000/favorite_sports', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFavorite)
    })
    .then(r => r.json())
    .then(newFavoriteSport => console.log(newFavoriteSport))
  }

    return (
      <div className="sport-card">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <h4>Equipment: {equipment}</h4>
        <button onClick={addSport}>+</button>
        <p>Rules: {rules}</p>
      </div>
    );
}
  
export default Sport;