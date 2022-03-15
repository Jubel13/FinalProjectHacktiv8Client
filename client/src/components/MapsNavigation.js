import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
export default function MapsNavigation() {
  const defaultProps = {
    center: {
      lat: -6.229991,
      lng: 106.721986
    },
    zoom: 11
  };

  const handleApiLoaded = (map, maps) => {
    console.log(map, maps, ' <==============');
  };
  
  return (
    <div style={{ height: '50vh', width: '50%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBjlQ0LbPIFIH3rExuCRIFoDifRyNAyenw" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <AnyReactComponent
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          text="Posisi Gue"
          
        />
      </GoogleMapReact>
    </div>
  )
}