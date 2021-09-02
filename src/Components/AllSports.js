import { useSelector } from "react-redux";
import Sport from "./Sport";
import { Grid, Header } from 'semantic-ui-react';


function AllSports({ user }) {
    const sports = useSelector(storeState => storeState.sports);
    const sportArray = sports.map((sport, index) => {
        return (
            <Grid.Column key={index}>
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
      <div className='sports-container'>
        <Header textAlign="center" as="h2" >Find Your Favorite Sports</Header>
        <Grid doubling centered center="true" columns={5}>
          {sportArray}
        </Grid>
      </div>
    );
}
  
export default AllSports;
  