import React from "react";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';


type ModalProps = {
    showModal: boolean;
    onCloseModal: any;
    address: any;
    number: any;
    locality: any;
    province: any;
    country: any;

};
export default function ModalMap(props: ModalProps) {
    const router = useRouter();
    const [locations, setLocations] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);



    const MapComponent = dynamic(() => import("../map/mapcomponent"), {
        ssr: false
    });
    React.useEffect(() => {
        const geolocation = async () => {
            const params = {
                address: props.address + ' ' + props.number + ', ' + props.locality + ', ' + props.province + ', ' + props.country,
                key: 'AIzaSyDKO7LtSKcdodurJSl6Xqu_igZ0UCrRmwg'
            }
            let locAux: any[] = [];
            const rawResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params });
            console.log(rawResponse.data.results[0].geometry);
            locAux.push(Number(rawResponse.data.results[0].geometry.location.lng));
            locAux.push(Number(rawResponse.data.results[0].geometry.location.lat));
            setLocations(locAux)
        }
        // geolocation();
        let locAux: any[] = [];
        locAux.push(Number(-58.4367408));
        locAux.push(Number(-34.6196938));
        setLocations(locAux);
    }, [])
    return (
        <>
            {
                props.showModal ? (
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-whitecolor py-12 px-12">
                        
                        <div className="flex items-center justify-end rounded-t pt-5">
                            <button
                                className="bg-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-primary z-55"
                                type="button"
                                onClick={() => props.onCloseModal()}
                            >
                                Cerrar
                            </button>
                        </div>
                        <div className='z-51 w-1/2 h-1/2'>
                            <MapComponent locations={locations} />
                        </div>


                    </div>
                ) : null
            }
        </>
    );
}