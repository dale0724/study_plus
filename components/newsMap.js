import React, { Component } from 'react';
import ReactMapGl, {Marker, Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

const mapboxToken = 'pk.eyJ1IjoicWlhbmhhbnllIiwiYSI6ImNreXJjOXBoYTBzbXYydXFqbjd4ZGVrZmEifQ.ap779frR1JOxLSpYd1Z5kQ'
export default class NewsMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: '60vw',
                height: '100vh',
                latitude: 1.349783,
                longitude: 103.685030,
                zoom: 15
            },
            currMarker: null,
            markers: [],
            selectedMarker: null
        }
        this.handleViewportChange = this.handleViewportChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
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
        this.setState({
            currMarker: {
                name: "New Post",
                latitude: event.lngLat[1],
                longitude: event.lngLat[0]
            }
        })
    }
    addMarker() {
        const {currMarker} = this.state
        this.setState(prevState => ({
            markers: [...prevState.markers, currMarker],
            currMarker: null
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
        const {viewport, markers, selectedMarker} = this.state
        return (
            <ReactMapGl
                {...viewport}
                onViewportChange={viewport => this.setState({viewport})}
                mapboxApiAccessToken={mapboxToken}
                mapStyle="mapbox://styles/mapbox/streets-v10"
                onClick={this.handleClick}
            >
                <button className="add-btn" onClick={this.addMarker}>Add</button>
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
                    <h3>{selectedMarker.name}</h3>
                </Popup>
                }
            </ReactMapGl>
        )
    }
}