import { useState } from "react";
import { Card, Icon, Image, Button, CardContent, CardHeader, Popup, Header, Divider } from 'semantic-ui-react'

function Sport({ name, equipment, image="../default_sport.jpg", rules, id, user }) {
  
  const [active, setActive] = useState(false);

  function addSport(e) {
    e.preventDefault();

    const newFavorite = {
      user_id: user.id,
      sport_id: id
    }

    fetch('https://calm-bayou-84971.herokuapp.com/favorite_sports', {
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
        <Card style={{height: "480px", paddingRight: "0px"}}>
         <img src={image} alt={name} height="195px"/>
         <Card.Content>
           <Card.Header textAlign="center">{name}</Card.Header>
           <Card.Description >
            <Card.Header style={{width: "fitcontent", top: "-10px"}} as="h4">
            <Popup content="Add To Favorite Sports" trigger={<Button style={{top: "-1230px"}} color="green" inverted floated="right" onClick={addSport} content="+" />}></Popup>
              Equipment:</Card.Header>
              {equipment} 
           </Card.Description>
           <Divider />
            <Card.Description style={{height: "150px", overflow: "auto"}} extra>
              <Card.Header style={{width: "fitcontent", top: "-10px"}} as="h5">Rules:</Card.Header>
              {rules}
            </Card.Description>
          </Card.Content>
        </Card>
    );
}<div class="ui icon button" data-content="Add users to your feed">
<i class="add icon"></i>
</div>
  
export default Sport;