import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { PropTypes } from "prop-types";

const FooterMap = props => {
  const mapStyles = {
    width: "70%",
    height: "70%",
    justifyContent: "center",
    alignItem: "center",
    margin: "0 auto",
    displan: "none"
  };
  const alignMap = {
    margin: "0 auto",
    backgroundColor: "yellow"
  }

  return (
    <div style={alignMap}>
      <Map
        google={props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{ lat: props.latitude, lng: props.longitude }}
      >
        <Marker
          position={{ lat: "props.latitude", lng: props.longitude }}
          icon={{
            url: `${"/assets/img/icon-img/2.png"}`
          }}
          animation={props.google.maps.Animation.BOUNCE}
        />
      </Map>
    </div>
  );
};

FooterMap.propTypes = {
  google: PropTypes.object,
  latitude: PropTypes.string,
  longitude: PropTypes.string
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyB2D8wrWMY3XZnuHO6C31uq90JiuaFzGws"
})(FooterMap);
