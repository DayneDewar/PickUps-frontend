import { useState } from "react";
import { Button } from "semantic-ui-react";

function Sport({ name, equipment, image="../default_sport.jpg", rules, id, user }) {
  
  const [active, setActive] = useState(false);

  function addSport(e) {
    e.preventDefault();

    const newFavorite = {
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
    .then(newFavoriteSport => setActive(true))
  }

    return (
      <div className="sport-card">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <h4>Equipment: {equipment}</h4>
        <Button toggle active={active} onClick={addSport}>+</Button>
        <p>Rules: {rules}</p>
      </div>
    );
}
  
export default Sport;