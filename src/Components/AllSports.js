import { useEffect, useState } from "react";
import Sport from "./Sport";

function AllSports() {
    const [sports, setSports] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3000/sports')
        .then(r => r.json())
        .then(data => setSports(data))
    }, [])

    const sportArray = sports.map(sport => {
        return (
            <Sport 
            key={sport.id}
            name={sport.name}
            equipment={sport.equipment}
            image={sport.image}
            rules= {sport.rules}
            id={sport.id}
            />
        )
    })
    return (
      <div className="sport-container">
          {sportArray}
      </div>
    );
}
  
export default AllSports;
  