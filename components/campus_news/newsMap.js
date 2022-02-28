import React, { Component } from 'react';
import ReactMapGl, {Marker, Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import {Row, Col} from "react-bootstrap";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import styles from "../../styles/newsMap.module.css";
import useSWR from "swr";
import { fetchWrapper } from "../../tools/fetchWrapper";

const mapboxToken = 'pk.eyJ1IjoicWlhbmhhbnllIiwiYSI6ImNreXJjOXBoYTBzbXYydXFqbjd4ZGVrZmEifQ.ap779frR1JOxLSpYd1Z5kQ'
export default class NewsMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewportConst: {
                width: '60vw',
                height: '100vh'
            },
            viewportVar: {
            latitude: 1.349783,
            longitude: 103.685030,
            zoom: 15
            },
            currMarker: {
                name: null,
                longitude: null,
                latitude: null,
                value: null
            },
            markers: [], /*Connect to DB and fetch posts data*/
            selectedMarker: null
        }
        this.handleViewportChange = this.handleViewportChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addMarker = this.addMarker.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleMarkerClick = this.handleMarkerClick.bind(this)
    }
    mapRef = React.createRef()
    handleViewportChange(viewport) {
        this.setState(prevState => ({
            viewport: {...prevState.viewport, ...viewport}
        }))
    }
    handleClick (event) {
        this.setState(prevState => ({
            currMarker: {
                name: prevState.currMarker.name,
                value: prevState.currMarker.value,
                latitude: event.lngLat[1],
                longitude: event.lngLat[0]
            }
        }))
    }
    handleChange (event) {
        if (event.target.name=="newsTitle"){
            this.setState(prevState => ({
                currMarker: {
                    name: event.target.value,
                    longitude: prevState.currMarker.longitude,
                    latitude: prevState.currMarker.latitude,
                    value: prevState.currMarker.value,
                }
            }))
        }
        else if (event.target.name=="newsContent") {
            this.setState(prevState => ({
                currMarker: {
                    name: prevState.currMarker.name,
                    longitude: prevState.currMarker.longitude,
                    latitude: prevState.currMarker.latitude,
                    value: event.target.value,
                }
            }))
        }
    }
    addMarker() {
        const {currMarker} = this.state
        if(currMarker.longitude&&currMarker.latitude&&currMarker.name&&currMarker.value){
            this.setState(prevState => ({
                markers: [...prevState.markers, currMarker],
                currMarker: {
                    name: null,
                    longitude: null,
                    latitude: null,
                    value: null
                }
            }))
            /*Connect to DB and send data*/
        }else {
            alert("you must fill in the required field or select a location to post this campus news!")
        }
    }
    handleMarkerClick(marker) {
        this.setState({
            selectedMarker: marker
        })
    }
    handleClose = () => {
        this.setState({
            selectedMarker: null
        })
    }
    render() {
        var {viewportConst, viewportVar, markers, currMarker, selectedMarker} = this.state
        fetchWrapper.get('http://localhost:3000/api/campus_news/all_posts').then(resData => {
                markers = resData['data'].map(news =>
                JSON.parse(news)
                )
                console.log(markers)
            }).catch(error => {
                console.error(error)
            })
        return (
            <div className={`mt-3 ${styles.border}`} >
            <Row>
                <Col>
                    <ReactMapGl
                        {...viewportConst}
                        viewState={{...viewportVar}}
                        onViewportChange={viewportVar => this.setState({viewportVar})}
                        mapboxApiAccessToken={mapboxToken}
                        mapStyle="mapbox://styles/mapbox/streets-v10"
                        onClick={this.handleClick}
                        scrollZoom={false}
                        style={{margin: "1rem"}}
                    >
                        {currMarker.latitude && currMarker.longitude &&
                        <Marker
                            latitude={currMarker.latitude}
                            longitude={currMarker.longitude}
                            offsetLeft={-15}
                            offsetTop={-45.5}
                        >
                            <img src="https://www.clipartmax.com/png/full/151-1517460_icon-contact-flat-web-business-symbol-blue-location-pin-icon-png.png" width='30px' height='45px' alt="marker"/>
                        </Marker>
                        }
                        {markers.map((marker, idx) => {
                            return (
                                <Marker
                                    key={idx}
                                    latitude={marker.latitude}
                                    longitude={marker.longitude}
                                    onClick={() => this.handleMarkerClick(marker)}
                                    offsetLeft={-26}
                                    offsetTop={-50}
                                >
                                    <img src="https://www.freepnglogos.com/uploads/pin-png/location-pin-connectsafely-37.png" width='50px' alt="marker"/>
                                </Marker>
                            )
                        })
                        }
                        {this.state.selectedMarker &&
                        <Popup
                            mapRef={this.mapRef}
                            latitude={selectedMarker.latitude}
                            longitude={selectedMarker.longitude}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={this.handleClose}
                        >
                            <h5><Link href='/news/post_id' passHref><span>{selectedMarker.name}</span></Link></h5>
                            {selectedMarker.value}
                        </Popup>
                        }
                    </ReactMapGl>
                </Col>
                <Col>
                    <br/>
                    <Row><span className={styles.titleText}>Post the Latest Campus News Here</span></Row>
                    <Row>
                        <Col style={{textAlign:"right"}}>
                            <label>
                                News Title:
                            </label>
                        </Col>
                        <Col style={{textAlign:"left"}}>
                            <label>
                                <input type="text" name= "newsTitle" value={this.state.currMarker.name} onChange={this.handleChange} />
                            </label>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{textAlign:"right"}}>
                            <label>
                                News Content:
                            </label>
                        </Col>
                        <Col style={{textAlign:"left"}}>
                            <label>
                                <textarea type="text" rows="3" name= "newsContent" value={this.state.currMarker.value} onChange={this.handleChange}/>
                            </label>
                        </Col>
                    </Row>
                    <Row>
                        <span>Don't forget to select your post location on the map before you submit!</span>
                    </Row>
                    <Button onClick={this.addMarker} style={{display:"inline-block", margin:"1em", background:"#7BA1C7"}}>Post a Campus News</Button>
                </Col>
            </Row>
            </div>
        )
    }
}
function apiCall(url){
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(url, fetcher)
    return {data, error}
}
