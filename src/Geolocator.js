import React from "react";
import { geolocated } from "react-geolocated";
import MapContainer from './MapContainer'

class Geolocator extends React.Component {
    render() {
        console.log('coords1: ', this.props.coords)
        //console.log(this.props.isGeolocationAvailable, this.props.isGeolocationEnabled)
        if(this.props.coords){console.log('coords2: ', this.props.coords.latitude)}
        return(
            this.props.coords ? (
            <MapContainer 
                address={this.props.address}
                coords={{
                    latitude : this.props.coords.latitude,
                    longitude : this.props.coords.longitude,
                    altitude : this.props.coords.altitude,
                    accuracy : this.props.coords.accuracy,
                    altitudeAccuracy : this.props.coords.altitudeAccuracy,
                    heading : this.props.coords.heading,
                    speed : this.props.coords.speed
                }}
                isGeolocationAvailable={this.props.isGeolocationAvailable}
                isGeolocationEnabled={this.props.isGeolocationEnabled}
                positionError={this.props.positionError}
            />) : <h5 style={{ textAlign : "right" }}>Getting coordinates...</h5>
        )
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 10000,
    isOptimisticGeolocationEnabled : true,
    watchPosition  : true
})(Geolocator);