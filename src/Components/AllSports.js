import { useSelector } from "react-redux";
import Sport from "./Sport";
import { Grid, Image } from 'semantic-ui-react';


function AllSports({ user }) {
    const sports = useSelector(storeState => storeState.sports);
    const sportArray = sports.map(sport => {
        return (
            <Grid.Column>
            <Sport 
                key={sport.id}
                name={sport.name}
                equipment={sport.equipment}
                image={sport.image}
                rules= {sport.rules}
                id={sport.id}
                user={user}
            />
            </Grid.Column>
        )
    })
    return (
      <Grid relaxed columns={4} className="sport-container">
          {sportArray}
      </Grid>
    );
}
  
export default AllSports;
  