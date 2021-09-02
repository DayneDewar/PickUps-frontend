import { useSelector } from "react-redux";
import Sport from "./Sport";
import { Grid, Segment, Divider, Input, Header } from 'semantic-ui-react';
import NewSportForm from "./NewSportForm";
import { useState } from "react";


function AllSports({ user }) {
    const sports = useSelector(storeState => storeState.sports);
    const [search, setSearch] = useState('')

    const searchedSports = sports.filter(sport => {
      return sport.name.toLowerCase().includes(search.toLowerCase())
    }) 

    const sportArray = searchedSports.map((sport, index) => {
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
          <Segment style={{width: "50vw", margin:"auto", backgroundColor: "silver", marginBottom: '1vw', marginTop: '1vw'}} >
            <Grid columns={2} relaxed='very' stackable>
              <Grid.Column verticalAlign='middle'>
                <Header>Search For A Sport</Header>
                <Input fluid icon='search' placeholder='Search...' onChange={(e) => setSearch(e.target.value)} value={search}/>
              </Grid.Column>
              <Grid.Column>
                <NewSportForm />
              </Grid.Column>
            </Grid>
            <Divider vertical>Or</Divider>
        </Segment>
        <Grid doubling centered center="true" columns={5}>
          {sportArray}
        </Grid>
      </div>
    );
}
  
export default AllSports;
  