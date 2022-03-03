import React, { Component } from 'react';
import Map, {Marker, Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import {Row, Col} from "react-bootstrap";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import styles from "../../styles/newsMap.module.css";
import useSWR from "swr";
import { fetchWrapper } from "../../tools/fetchWrapper";
import {newsDTO, JSONToInstance, ObjectToInstance} from "../../DTO/campus_news";
import { useLoggedUserData } from "../../tools/helper";
import NewsAddNewBox from "./newsAddNewBox";
import {useState} from "react";
import MySpinner from "../mySpinner";

const mapboxToken = 'pk.eyJ1IjoicWlhbmhhbnllIiwiYSI6ImNreXJjOXBoYTBzbXYydXFqbjd4ZGVrZmEifQ.ap779frR1JOxLSpYd1Z5kQ'
export default function NewsMap(props){
    const viewportConst = {
        width: '60vw',
        height: '100vh',
        zoom: 14.9
    }
    const [viewState, setViewState] = useState({
        longitude: 103.685030,
        latitude: 1.348,
      });
    const{longitude, setLongitude} = useState(null)
    const{latitude, setLatitude} = useState(null)
    const{selectedMarker, setSelectedMarker} = useState(null)
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR('http://localhost:3000/api/campus_news/all_posts', fetcher)
    var markersContent
    var tempMarker
    var popupContent
    if(error){
        markersContent = "Error"
    }
    else{
         if (data) {
            const markerList = data['data'].map(jsonData=>JSON.parse(jsonData))
            console.log(markerList)
            markersContent = markerList.map(marker=>
                <Marker
                    key={marker.id}
                    latitude={parseFloat(marker.latitude)}
                    longitude={parseFloat(marker.longitude)}
                    onClick = {() => setSelectedMarker(marker)}
                    offsetLeft={-26}
                    offsetTop={-50}
                >
                    <img src="https://www.freepnglogos.com/uploads/pin-png/location-pin-connectsafely-37.png" width='50px' alt="marker"/>
                </Marker>
            )
            console.log(markersContent)
        }
        else{
            markersContent = <MySpinner></MySpinner>
        }
    }
    if (latitude && longitude) {
        tempMarker = <Marker
                    latitude={latitude}
                    longitude={longitude}
                    offsetLeft={-15}
                    offsetTop={-45.5}
                    >
                    <img src="https://www.clipartmax.com/png/full/151-1517460_icon-contact-flat-web-business-symbol-blue-location-pin-icon-png.png" width='30px' height='45px' alt="marker"/>
                    </Marker>
    } else {
        tempMarker = null
    }
    const mapRef = React.createRef()
    if (selectedMarker){
        popupContent = <Popup
                            mapRef={mapRef}
                            latitude={selectedMarker.latitude}
                            longitude={selectedMarker.longitude}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={handleClose}
                        >
                            <h5><Link href={`/campus_news/${encodeURIComponent(marker.id)}`} passHref><span>{selectedMarker.title}</span></Link></h5>
                            {selectedMarker.content}
                        </Popup>

    function handleClose = () => {
        setSelectedMarker(null)
    }


    function handleClick (event) {
        setLongitude(event.lngLat[0]);
        setLatitude(event.lngLat[1]);
    }

    return (
        <>
            <div className={`mt-3 ${styles.border}`} >
            <Row>
                <Col>
                    <Map
                        ref={mapRef}
                        {...viewportConst}
                        {...viewState}
                        //onMove={evt => setViewState(evt.viewState)}
                        onDrag={evt => {setViewState(evt.viewState); console.log(evt.viewState)}}
                        mapboxApiAccessToken={mapboxToken}
                        mapStyle="mapbox://styles/mapbox/streets-v10"
                        onClick={handleClick}
                        //scrollZoom={false}
                        style={{margin: "1rem"}}
                    >{markersContent}{tempMarker}{popupContent}
                    </Map>
                </Col>
                <NewsAddNewBox longitude={longitude} latitude={latitude}/>
            </Row>
            </div>
        </>
    );
}
