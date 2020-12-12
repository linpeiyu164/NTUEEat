import React from 'react'
import  { MapContainer, TileLayer, Popup, CircleMarker}  from 'react-leaflet'
import './Map.css'
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Card, CardContent} from '@material-ui/core'
import StarRoundedIcon from '@material-ui/icons/StarRounded';

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
  
function StoreMap({storename , coordinates, location, rating}){
        const classes = useStyles()
        return(
            <MapContainer center={coordinates} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    draggable="true"
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                    url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=98cqmbPl7vgPxrspXRdI"
                />
                <CircleMarker 
                    center={coordinates}
                    radius={10}
                >
                <Popup position={coordinates}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4">{storename}</Typography>
                            <Typography className={classes.rating} color="textSecondary">
                                <StarRoundedIcon className={classes.rating}/>
                                {` ${rating}`}
                            </Typography>
                            <Typography className={classes.rating}>{location}</Typography>
                        </CardContent>
                    </Card>
                </Popup>
                </CircleMarker>
            </MapContainer>
        )
    
}

export default StoreMap;

