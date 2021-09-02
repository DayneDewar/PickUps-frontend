import { useState } from "react";
import { Card, Button, Popup, Divider } from 'semantic-ui-react'

function Sport({ name, equipment, image="../default_sport.jpg", rules, id, user }) {
  const [active, setActive] = useState(true)
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
        <Card className='sport-card'>
         <img src={image} alt={name} height="195px"/>
         <Card.Content>
           <Card.Header textAlign="center">{name}</Card.Header>
           <Card.Description >
            <Card.Header style={{width: "fitcontent", top: "-10px"}} as="h4">
            <Popup content="Add To Favorite Sports" trigger={<Button style={{top: "-1230px"}} floated="right" onClick={addSport} icon="add" />} />
              Equipment:</Card.Header>
              {equipment} 
           </Card.Description>
           <Divider />
            <Card.Description style={{height: "150px", overflow: "auto"}} extra="true">
              <Card.Header style={{width: "fitcontent", top: "-10px"}} as="h5">Rules:</Card.Header>
              {rules}
            </Card.Description>
          </Card.Content>
        </Card>
    );
}
  
export default Sport;