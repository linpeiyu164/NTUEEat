import { CodeSharp } from "@material-ui/icons"
import { useEffect , useContext, useState} from "react"
import { getCoord } from './routes/routes'
import StoreMap from "./StoreMap"
import userCommentContext from './components/store/userCommentContext'
// import findCoord from './child_process/findCoord'
function MapContainer({
    coords,
    isGeolocationAvailable, // boolean flag indicating that the browser supports the Geolocation API
    isGeolocationEnabled, // boolean flag indicating that the user has allowed the use of the Geolocation API
    positionError, // object with the error returned from the Geolocation API call
}){
    const [storeCoordination, setStoreCoordination] = useState();
    const {address} = useContext(userCommentContext) 
    //console.log(address)
    console.log('flag2: ', coords)
    let { latitude, longitude } = coords
    console.log('flag')
    useEffect(async() => {
        const loc = await getCoord(address)
        if (loc !== 'error'){
            console.log('loc: ', loc)
            // const data = JSON.parse(loc)
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
    //const storeCoordination = await getCoord(address)
    //console.log('storeCoordi', storeCoordination)
    // let lat, log;
    // if (storeCoordination !== 'error'){
    //     const data = JSON.parse(storeCoordination)
    //     lat = data.lat;
    //     log = data.log;
    //     lat = parseFloat(lat)
    //     log = parseFloat(log)
    //     console.log(lat, log)
    // } 
    // useEffect(() => {
    //     if (storeCoordination !== 'error'){
    //         const data = JSON.parse(storeCoordination)
    //         lat = data.lat;
    //         log = data.log;
    //         lat = parseFloat(lat)
    //         log = parseFloat(log)
    //         console.log(lat, log)
    //     } 
    // }, [storeCoordination])
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
                ) :  (coords && storeCoordination)? (
                    <StoreMap calculateDistance={calculateDistance} storename="storename" userCoords={[latitude, longitude]} storeCoords={storeCoordination&&[storeCoordination.lat, storeCoordination.log]} location="taipei" rating={4.3} />
                ) : (
                    <div>Loading</div>
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
