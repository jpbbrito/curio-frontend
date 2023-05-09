import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';

import PointCard from './PointCard';
import PointModal from './PointModal';

import { getAllProblems, getAllImagesByUUID, getImageByUUID } from '../services/curio-api';
import './MapContent.css';

import { Problem } from '../interfaces/Problems';
import { Image } from '../interfaces/Images';

import { REACT_APP_MAPS_KEY } from '../App';

interface IProps {
    problems: Problem[],
    currentPosition: {
        lat: any,
        lng: any
    }
}
function MapContent({ problems, currentPosition } : IProps) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const [googleMap, setGoogleMap] = useState<google.maps.Map>()
    const [image, setImage] = useState<Image>()
    const [allImage, setAllImage] = useState<Image[]>()
    const [selectedMarker, setSelectedMarker] = useState<Problem>()
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: REACT_APP_MAPS_KEY || ""
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function getImage(uuid: string) {
        console.log('[getImage] uuid -> ', uuid)
        console.log('[getImage] allImage-> ', allImage)

        const fetchAllImage = async (uuid: string) => {
            const response = await getAllImagesByUUID(uuid)
            console.log('[getAllImages] response.data->', response)
            return response
        }

        const fetchImage = async (uuid: string) => {
            console.log('[fetchImage] allImage-> ', allImage)
            const resultImages = await fetchAllImage(uuid)
            console.log('[fetchImage] resultImages-> ', resultImages)
            const response = await getImageByUUID(resultImages[0].uuid)
            console.log('[getImage] response.data->', response)
            setImage(response)
        }
        fetchImage(uuid)
    }

    function cleanPointStates() {
        setTimeout(() => { console.log('Waiting image') }, 3000)
        setSelectedMarker(undefined)
        setImage(undefined)
        setAllImage(undefined)
        setIsOpenModal(false)
    }

    function loadMarker(problems: any) {
        return (
            problems.map((point: any) => (
                <>
                    <Marker
                        position={{
                            lat: parseFloat(point.latitude),
                            lng: parseFloat(point.longitude),
                        }}
                        title={point.description}
                        onClick={(e) => {
                            getImage(point.uuid)
                            setSelectedMarker(point)
                        }}
                        options={{ map: googleMap }}
                    > </Marker>
                </>

            )
        )
        )
    }
    

    return (
        <>
            {
                isLoaded ? (
                    <GoogleMap
                        onLoad={mapState => { setGoogleMap(mapState); }}
                        mapContainerStyle={{ width: '100%', height: '95%' }}
                        center={currentPosition}
                        zoom={10}
                    >
                        {googleMap && (
                            problems.length > 0 &&
                            loadMarker(problems)
                            )}
                        {selectedMarker && (
                            <>
                                <InfoWindow
                                    onCloseClick={cleanPointStates}
                                    position={{
                                        lat: parseFloat(selectedMarker.latitude),
                                        lng: parseFloat(selectedMarker.longitude),
                                    }}
                                    

                                >

                                    <PointCard point={selectedMarker} cleanPointStates={cleanPointStates} setIsOpenModal={setIsOpenModal}></PointCard>

                                </InfoWindow>
                                <PointModal isOpenModal={isOpenModal} point={selectedMarker} image={image} setIsOpenModal={setIsOpenModal} />
                            </>

                        )}
                    </GoogleMap>

                ) : <></>
            }
        </>
    )
}

export default MapContent;
