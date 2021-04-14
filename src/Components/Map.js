import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

function Map({ lati, long }) {

    return (
      <div className="map">
          <GoogleMapReact bootstrapURLKeys={{key: 
            process.env.REACT_APP_KEY
        }}
            defaultCenter={{ lat: lati, lng: long}}
            defaultZoom={ 12 }
          >
              <Marker lat={lati} lng={long}/>
          </GoogleMapReact>
      </div>
    );
}
  
export default Map;