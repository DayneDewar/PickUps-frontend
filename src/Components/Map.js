import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

function Map({ lati, long }) {

    console.log(process.env.REACT_APP_KEY)
    return (
      <div className="map">
          <GoogleMapReact bootstrapURLKeys={{key: 
            process.env.REACT_APP_KEY
        }}
            defaultCenter={{ lat: lati, lng: long}}
            defaultZoom={ 14 }
          >
              <Marker />
          </GoogleMapReact>
      </div>
    );
}
  
export default Map;