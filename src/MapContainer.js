import { CodeSharp } from "@material-ui/icons"
import { useEffect , useContext, useState} from "react"
import { getCoord } from './routes/routes'
import StoreMap from "./StoreMap"
import userCommentContext from './components/store/userCommentContext'
import { Paper } from "@material-ui/core"
// import findCoord from './child_process/findCoord'
function MapContainer({
    coords,
    isGeolocationAvailable, // boolean flag indicating that the browser supports the Geolocation API
    isGeolocationEnabled, // boolean flag indicating that the user has allowed the use of the Geolocation API
    positionError, // object with the error returned from the Geolocation API call
}){
    const [storeCoordination, setStoreCoordination] = useState();
    const {address, storename, rating} = useContext(userCommentContext) 

    console.log('flag2: ', coords)
    let { latitude, longitude } = coords
    console.log('flag')
    useEffect(async() => {
        const loc = await getCoord(address)
        console.log('loc: ', loc)
        if (loc !== 'error'){
            const data = loc
            let lat = data.lat;
            let log = data.log;
            lat = parseFloat(lat)
            log = parseFloat(log)
            setStoreCoordination({ lat : lat, log : log})
            console.log(lat, log)
        } 
        // setStoreCoordination(loc)
    },[])

    const calculateDistance = (lat1, lng1, lat2, lng2) => {
        console.log(lat1, lng1, lat2, lng2)
        const EARTH_RADIUS = 6371
        let dlat = ((lat2-lat1)*Math.PI)/180
        let dlng = ((lng2-lng1)*Math.PI)/180
        let Squared = Math.sin(dlat) * Math.sin(dlat) + 
        Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * 
        Math.sin(dlng/2) * Math.sin(dlng/2)
        let d = 2 * EARTH_RADIUS * Math.asin(Math.sqrt(Squared))
        // console.log(coords, storeCoordination)
        return d.toFixed(3)
    }

    return(
        <>
            { (!isGeolocationAvailable) ? (
                    <div>Your browser does not support Geolocation</div>
                ) : (!isGeolocationEnabled) ? (
                    <div>Geolocation is not enabled, if using Safari, please switch to Chrome</div>
                ) :  (coords && storeCoordination)? (
                    <StoreMap calculateDistance={calculateDistance} storename={storename} userCoords={[latitude, longitude]} storeCoords={storeCoordination&&[storeCoordination.lat, storeCoordination.log]} location={address} rating={rating&&rating} />
                ) : (
                    <h5 style={{ textAlign : "right" }}>Loading...</h5>
                )
            }
        </>
    )
}
export default MapContainer
/*
{
        coords,
        isGeolocationAvailable, // boolean flag indicating that the browser supports the Geolocation API
        isGeolocationEnabled, // boolean flag indicating that the user has allowed the use of the Geolocation API
        positionError, // object with the error returned from the Geolocation API call
    }
*/
