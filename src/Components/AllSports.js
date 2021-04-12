import Sport from "./Sport";

function AllSports({ sports, user }) {
    
    const sportArray = sports.map(sport => {
        return (
            <Sport 
                key={sport.id}
                name={sport.name}
                equipment={sport.equipment}
                image={sport.image}
                rules= {sport.rules}
                id={sport.id}
                user={user}
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
  