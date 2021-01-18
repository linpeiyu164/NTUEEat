import { CodeSharp } from "@material-ui/icons"
import { useEffect } from "react"
import StoreMap from "./StoreMap"

function MapContainer({
        coords,
        isGeolocationAvailable, // boolean flag indicating that the browser supports the Geolocation API
        isGeolocationEnabled, // boolean flag indicating that the user has allowed the use of the Geolocation API
        positionError, // object with the error returned from the Geolocation API call
    }){
    
    let { latitude, longitude } = coords

    const calculateDistance = (lat1, lng1, lat2, lng2) => {
        // spherical coordinates dl = ( dr , r * dtheta + r^2 , r * sintheta * dphi)
        const EARTH_RADIUS = 6371
        let Squared = Math.sin((lat2-lat1)*Math.PI/180) * Math.sin((lat2-lat1)*Math.PI/180) + 
        Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180) * 
        Math.sin((lng2-lng1)*Math.PI/2*180)*Math.sin((lng2-lng1)*Math.PI/2*180)
        let d = 2 * EARTH_RADIUS * Math.asin(Math.sqrt(Squared))
        return d
    }

    return(
        <>
            { (!isGeolocationAvailable) ? (
                    <div>Your browser does not support Geolocation</div>
                ) : (!isGeolocationEnabled) ? (
                    <div>Geolocation is not enabled, if using Safari, please switch to Chrome</div>
                ) :  coords? (
                    <StoreMap calculateDistance={calculateDistance} storename="storename" userCoords={[latitude, longitude]} location="taipei" rating={4.3} />
                ) : (
                    <div>Loading</div>
                )
            }
        </>
    )
}
export default MapContainer