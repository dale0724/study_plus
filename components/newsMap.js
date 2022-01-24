import React, { Component } from 'react';
import ReactMapGl, {Marker, Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import {Row, Col} from "react-bootstrap";
import Link from "next/link";

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
            markers: [],
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
        this.setState(prevState => ({
            markers: [...prevState.markers, currMarker],
            currMarker: {
                name: null,
                longitude: null,
                latitude: null,
                value: null
            }
        }))
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
        const {viewportConst, viewportVar, markers, selectedMarker} = this.state
        return (
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
                    >
                        {markers.map((marker, idx) => {
                            return (
                                <Marker
                                    key={idx}
                                    latitude={marker.latitude}
                                    longitude={marker.longitude}
                                    onClick={() => this.handleMarkerClick(marker)}
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
                                <input type="text" name= "newsContent" value={this.state.currMarker.value} onChange={this.handleChange} />
                            </label>
                        </Col>
                    </Row>
                    <Row>
                        <span>Don't forget to select your post location on the map before you submit!</span>
                    </Row>
                    <button onClick={this.addMarker}>Add</button>
                </Col>
            </Row>
        )
    }
}
