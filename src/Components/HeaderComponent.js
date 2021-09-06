import { Header, Image } from "semantic-ui-react";

function HeaderComponent() {
    return (
      <Header size="huge" style={{marginTop: "10px", paddingTop: "10px"}} color="olive" textAlign="center" >
          <Image src="https://nighthelper.com/wp-content/uploads/2014/01/play-sports.png"/>
          PickUps
      </Header>
    );
}
 
export default HeaderComponent;
