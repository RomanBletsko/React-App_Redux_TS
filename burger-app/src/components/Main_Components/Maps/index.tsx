import  { useState, useCallback, useRef, useEffect } from "react"
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { defaultTheme } from "./Theme";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import  Places  from "./Places/index";

const API_KEY:string = process.env.REACT_APP_API_KEY || ""

const containerStyle = {
    width: '500px',
    height: '400px',
    
};
  
export interface CenterI{
    lat: number,
    lng: number,
}
const center: CenterI = {
    lat: 50.4411577,
    lng: 30.5203175
}; 

const libraries:[any] = ['places']

const defaultOptions = {
    panControl: true,
    zoomControl: true,
    mapTypeControl:false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    clicableIcon: false,
    keyboardShortcuts: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    styles: defaultTheme,
} 

const Map:React.FC = ()=>{
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY,
        libraries,
    })
   
    
    const {
        init,
        clearSuggestions,
      } =  usePlacesAutocomplete({
        initOnMount: false,
        debounce: 300,
      });
      
    const [target, setTarget] = useState(center) 
    const [address, setAddress]= useState(`kyiv "Arena City", Velyka Vasylkivska St, 5`)
      
    const handle = (description:string)=>{
      clearSuggestions()
      setAddress(description)
      getGeocode({ address: description }).then((results:any) => {
        const { lat, lng }:CenterI = getLatLng(results[0]);
        // console.log("📍 Coordinates: ", { lat, lng });
        setTarget({ lat, lng })
      })
    }
    
    useEffect(()=>{
        if(isLoaded){
            init()
        }
        
    },[isLoaded, init])
   

    const mapRef = useRef(undefined)  

    const onLoad = useCallback((map:any) => {
        mapRef.current = map
      }, [])
    
      const onUnmount = useCallback(()=> {
        mapRef.current = undefined
      }, [])
     
    
    return <div>
      
        {isLoaded ?<>
        <Places 
        handleSelect={handle}
         />
      <p>Address: {address}</p>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={target}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={defaultOptions}
          >
            <Marker position={target}/>
          </GoogleMap>
        </> : null}
          
    </div>
}
export default Map
