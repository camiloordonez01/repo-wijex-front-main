import { useRouter } from 'next/router';
import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Image from "next/image";

export default function MapComponent({ locations }: any) {
    const router = useRouter();
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        // The latitude and longitude of the center of London
        latitude: locations[1],
        longitude: locations[0],
        zoom: 16
    });
    return <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={'pk.eyJ1IjoiamFyb2QxNyIsImEiOiJja3R1NnVwc28wZHZuMnNtb3c0ZWZrOGo2In0.dLYlfUIJZJZ4jRD7Qa2LFQ'}
        {...viewport}
        onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
    >
        <div key={locations.id}>
            <Marker
                latitude={locations[1]}
                longitude={locations[0]}
                offsetLeft={-20}
                offsetTop={-10}>
                <img
                    src={`${router.basePath}/assert/icons/direccion.svg`}
                    width={30}
                    height={30}
                    
                    alt="logo-linkedin"
                    className="rounded-full"

                />
            </Marker>
        </div>
    </ReactMapGL>
}
