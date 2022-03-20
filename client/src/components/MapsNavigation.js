import React, {useState, useEffect} from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';


export default function MapsNavigation() {
  const [dealerPosition, setDealerPosition] = useState({})
  const [userPosition, setUserPosition] = useState({})
  const [directions, setDirection] = useState(null)
  const directionCallback = (response)=>{
    if (response !== null) {
      if (response.status === 'OK') {
        setDirection(response)
      }
    }
  }

  const successCallback = (position)=> {
    setUserPosition(position.coords)
  }

  const errorCallback = (error)=> {
    console.log(error);
  }


  useEffect(() => {
    //get user location
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

    //get dealer location
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=Bandung&key=AIzaSyBjlQ0LbPIFIH3rExuCRIFoDifRyNAyenw`)
    .then(res => res.json())
    .then(data => {
      data.results.forEach(el => {
        setDealerPosition(el.geometry.location)
      });
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <LoadScript 
        googleMapsApiKey='AIzaSyBjlQ0LbPIFIH3rExuCRIFoDifRyNAyenw'>
          <GoogleMap
            mapContainerStyle={{ width: 1365, height: 625 }}
            center={{ lat: userPosition.latitude, lng: userPosition.longitude }}
            zoom={10}
          >
            {/* {
              <Marker position={{ lat: userPosition.latitude, lng: userPosition.longitude }}></Marker>
            }
            {
              dealerPosition.map(dealer => {
                return (
                  <Marker key={dealer.place_id} position={{lat: dealer.geometry.location.lat, lng: dealer.geometry.location.lng}} />
                )
              })
            } */}
            <DirectionsService
              options={{
                destination: {lat: dealerPosition.lat, lng: dealerPosition.lng},
                origin:{lat: userPosition.latitude, lng: userPosition.longitude },
                travelMode: 'DRIVING'
              }}
              callback={directionCallback}
            />
            
            {
              directions !== null && (
                <DirectionsRenderer directions={directions}/>
              )
            }

          </GoogleMap>
          
      </LoadScript>
    </div>
  ) 
}