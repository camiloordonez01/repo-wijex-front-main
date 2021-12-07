import React, {useEffect, useState} from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const GoogleMap = props => {
    const [latLng, setLatLng] = useState({lat: props.latitud, lng: props.longitud})
    
    useEffect(() => {
        setLatLng({lat: props.latitud, lng: props.longitud})
    },[props])

    const containerStyle = {
        position: 'relative',  
        width: '100%',
        height: '100%'
    }
    const style = {
        width: 'auto',
        height: '400px',
    }
    const clickMap = (t, map, coord) =>{
        const { latLng } = coord;
        const lat = latLng.lat()
        const lng = latLng.lng()
        setLatLng({
            lat,
            lng
        })
        props.setLat(lat)
        props.setLng(lng)
        props.setZoom(16)
    }
    return (
        <div style={style}>
            <Map
                google={props.google}
                containerStyle={containerStyle}
                keyboardShortcuts={false}
                disableDoubleClickZoom={true}
                onDblclick={!props.disabled && clickMap}
                center={latLng}
                zoom={props.zoom}
                disableDefaultUI={true}
                zoomControl={true}
                fullscreenControl={true}
            >
                <Marker
                    name={'Tu dirección'}
                    position={latLng} 
                /> 
            </Map>
        </div>
    )
}
export default GoogleApiWrapper({
    apiKey: ("AIzaSyDc0AUEXQNzsy8vPiPimCoTgUOJZLKLGU0")
}) (GoogleMap)