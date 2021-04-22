import { useState } from "react";
import GameDetails from "./GameDetails";
import moment from 'moment';
import { Card } from "semantic-ui-react";

function Game({ game, user, host }) {

    return (
      <Card color="black" style={{height: "238px", width: "218px" , paddingRight: "0px"}}>
        <Card.Content>
        <Card.Header style={{color: "grey"}} >{game.sport.name}</Card.Header> 
        <img src={game.sport.image} height="125px" width="175px"/>
        <Card.Description>Date: </Card.Description>
        <Card.Description>{moment(game.datetime).calendar()}</Card.Description>
          <GameDetails game={game} user={user} host={host} />
        </Card.Content>
      </Card>
    );
}
  
export default Game;
