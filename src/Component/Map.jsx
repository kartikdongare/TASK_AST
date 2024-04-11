import React, { useState ,useEffect} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { FaLocationDot } from "react-icons/fa6";
import TextField from '@mui/material/TextField';


const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 21.1458004,
  lng: 79.0881546,
};

const Map = ({ googleMapsApiKey }) => {
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const MAP_LIBRARIES = ['places'];
  const [userDetails,setUserDetails]=useState('')
  const handleSelect = async (address) => {
    console.log(address,'addrress')
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBiDeS5nKFEY8rHGN4-MqKBNdlMt79toFY`)
      .then(response => {
        const { lat, lng } = response.data.results[0].geometry.location;
        setSelectedLocation({lat,lng})
      })
      .catch(error => {
        setError(error.message,'did not get any data');
      });
  };
  // handleSelect('Sangola, Patur, India')
  useEffect(() => {
    setUserDetails({
      name:localStorage.getItem('name'),
      email:localStorage.getItem('email'),
      phone_no:localStorage.getItem('phone-no')
    })
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
        let latLng={lat:position.coords.latitude,lng:position.coords.longitude}
          setSelectedLocation(latLng)
          fetchNearbyPlaces({latitude:position.coords.latitude,longitude:position.coords.longitude})
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);
  const fetchNearbyPlaces = async ({latitude,longitude}) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=restaurant&key=${import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      console.log(response,'ress')
      setNearbyPlaces(response.data.results);
    } catch (error) {
      console.error('Error fetching nearby places:', error);
    }
  };
console.log(userDetails,'userDetails')
  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} loading="async" libraries={MAP_LIBRARIES} >
      <PlacesAutocomplete value={selectedLocation} onChange={setSelectedLocation} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
         
          <div>
             {console.log(getInputProps,'getInputProps')}
            {/* <input /> */}
            <TextField id="outlined-basic" label="Enter Address" variant="outlined" size='small' defaultValue={''} {...getInputProps({ placeholder: 'Enter location' })} />
            <p className="">User Name:-{userDetails?.name}</p>
            <p className="">Email:-{userDetails?.email}</p>
            <p className=""></p>
            <div>
              {loading ? <div>Loading...</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* {console.log(selectedLocation,'selectedLocation')} */}
      </PlacesAutocomplete>
      <GoogleMap mapContainerStyle={containerStyle} center={selectedLocation || center} zoom={14} onLoad={setMap}>
        {selectedLocation && <Marker position={selectedLocation} icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}/>}
        {nearbyPlaces.map((place) => (
          <Marker key={place.place_id} position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
