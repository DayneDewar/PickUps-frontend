import { useSelector } from "react-redux";
import Sport from "./Sport";
import { Grid, Image, Header } from 'semantic-ui-react';


function AllSports({ user }) {
    const sports = useSelector(storeState => storeState.sports);
    const sportArray = sports.map((sport, index) => {
        return (
            <Grid.Column key={index} style={{paddingLeft: "85px" }}>
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
      <div >
        <Header textAlign="center" as="h2" >Find Your Favorite Sports</Header>
         <Grid relaxed center="true" columns={4} style={{position: "center" }} className="sport-container">
          {sportArray}
        </Grid>
      </div>
    );
}
  
export default AllSports;
  