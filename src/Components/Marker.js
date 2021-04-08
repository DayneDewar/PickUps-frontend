import { Icon } from "semantic-ui-react";

function Marker({ lat, lng }) {
    
    return (
      <div className="marker">
          <Icon name='car'
          color='black'
          size='big'
          className='volleyball ball icon'
          />
      </div>
    );
}
  
export default Marker;