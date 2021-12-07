import React from 'react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import axios from 'axios';

const MapPage: NextPage = () => {
    const [locations, setLocations] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const MapComponent = dynamic(() => import("../../components/map/mapcomponent"), {
        ssr: false
    });
    React.useEffect(() => {
        // const geolocation = async () => {
        //     const params = {
        //         address: props.address + ' ' + props.number + ', ' + props.locality + ', ' + props.province + ', ' + props.country,
        //         key: 'AIzaSyDKO7LtSKcdodurJSl6Xqu_igZ0UCrRmwg'
        //     }
        //     let locAux: any[] = [];
        //     const rawResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params });
        //     console.log(rawResponse.data.results[0].geometry);
        //     locAux.push(Number(rawResponse.data.results[0].geometry.location.lng));
        //     locAux.push(Number(rawResponse.data.results[0].geometry.location.lat));
        //     setLocations(locAux)
        // }
        // geolocation();
        let locAux: any[] = [];
        locAux.push(Number(-65.2995999));
        locAux.push(Number(-24.1858241));
        setLocations(locAux);
    }, [])
    return (
        //<MapComponent locations={locations} />
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-whitecolor py-12 px-12">

            <MapComponent locations={locations} />

        </div>
    )
}

export default MapPage