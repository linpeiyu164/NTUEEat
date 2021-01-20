import React, { useState, useEffect } from 'react'
import  { MapContainer, TileLayer, Popup, CircleMarker}  from 'react-leaflet'
import './Map.css'
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Card, CardContent} from '@material-ui/core'
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import userCommentContext from './components/store/userCommentContext';

const useStyles = makeStyles({
    root: {
        minWidth: 300
    },
    title: {
        fontSize: 20,
    },
    rating: {
        fontSize : 15
    }
});
  
function StoreMap({ calculateDistance, storename , userCoords, storeCoords, location, rating}){
        console.log(storename, userCoords, storeCoords, location, rating)
        const classes = useStyles()
        let [distance, setDistance] = useState()
        useEffect(() => {
            console.log(userCoords, storeCoords)
            const [userLat, userLng] = userCoords
            const [storeLat, storeLng] = storeCoords
            setDistance(calculateDistance(userLat, userLng, storeLat, storeLng)) 
        }, [])
        return(
            <MapContainer center={storeCoords} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    draggable="true"
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                    url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=98cqmbPl7vgPxrspXRdI"
                />
                <CircleMarker 
                    center={storeCoords}
                    radius={10}
                >
                <Popup position={storeCoords}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4">{storename}</Typography>
                            <Typography className={classes.rating} color="textSecondary">
                                <StarRoundedIcon className={classes.rating} />
                                {rating ? ((rating).toFixed(1)) : 0 }
                            </Typography>
                            <Typography className={classes.rating}>{location}</Typography>
                            <Typography className={classes.rating}>{`Distance : ${distance} KM`}</Typography>
                        </CardContent>
                    </Card>
                </Popup>
                </CircleMarker>
            </MapContainer>
        )
}

export default StoreMap;

