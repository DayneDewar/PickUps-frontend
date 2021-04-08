import { useEffect, useState } from "react";
import Map from "./Map";

function Game({ location, equipment, players, sport, date, time, lat, lng }) {

    return (
      <div className="game">
        <Map lati={lat} long={lng} />
      </div>
    );
}
  
export default Game;