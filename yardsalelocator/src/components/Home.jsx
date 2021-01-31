import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback } from "react";
import MapGL, { NavigationControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGhlamF2YWJveXMiLCJhIjoiY2trNGsyYTd5MGMxYTJvdGh5MzJoZGNoaiJ9.5NRGHn_waxDVcG8__PJ_eA";

const Home = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  const geocoderContainerRef = useRef();
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 500 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );

  return (
    <div style={{ height: "100vh" }}>
      <div ref={geocoderContainerRef} style={{ width: "100%" }} />
      <MapGL
        ref={mapRef}
        {...viewport}
        width="80%"
        height="80%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <div style={{ position: 'absolute', right: 1 }}>
          <NavigationControl />
        </div>
      </MapGL>
      <Geocoder
        mapRef={mapRef}
        containerRef={geocoderContainerRef}
        onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
    </div>
  );
};

export default Home

//VERSION 2, Not functioning completely
// import React, { PureComponent } from "react";
// import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
// import { Button } from "reactstrap";
// import Geocoder from "react-mapbox-gl-geocoder";
// import "./Home.css";

// const mapStyle = {
// 	width: "80%",
// 	height: 600,
// };

// const mapboxApiKey = "pk.eyJ1IjoidGhlamF2YWJveXMiLCJhIjoiY2trNGsyYTd5MGMxYTJvdGh5MzJoZGNoaiJ9.5NRGHn_waxDVcG8__PJ_eA";

// const params = {
// 	country: "us",
// };

// const CustomMarker = ({ index, marker }) => {
// 	return (
// 		<Marker longitude={marker.longitude} latitude={marker.latitude}>
// 			<div className="marker">
// 				<span>
// 					<b>{index + 1}</b>
// 				</span>
// 			</div>
// 		</Marker>
// 	);
// };

// class Home extends PureComponent {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			viewport: {
// 				latitude: 45.50884,
// 				longitude: -73.58781,
// 				zoom: 15,
// 			},
// 			tempMarker: null,
// 			markers: [],
// 		};
// 	}

// 	onSelected = (viewport, item) => {
// 		this.setState({
// 			viewport,
// 			tempMarker: {
// 				name: item.place_name,
// 				longitude: item.center[0],
// 				latitude: item.center[1],
// 			},
// 		});
// 	};

// 	add = () => {
// 		var { tempMarker } = this.state;

// 		this.setState((prevState) => ({
// 			markers: [...prevState.markers, tempMarker],
// 			tempMarker: null,
// 		}));
// 	};

// 	render() {
// 		const { viewport, tempMarker, markers } = this.state;
// 		return (
// 			<div>
// 				<h2>Yard Sale Locator</h2>
// 				<Geocoder
// 					mapboxApiAccessToken={mapboxApiKey}
// 					onSelected={this.onSelected}
// 					viewport={viewport}
// 					hideOnSelect={true}
// 					value=""
// 					queryParams={params}
// 				/>
// 				<Button color="primary" onClick={this.add}>
// 					Add Marker
// 				</Button>
// 				<ReactMapGL
// 					mapboxApiAccessToken={mapboxApiKey}
// 					mapStyle="mapbox://styles/mapbox/streets-v11"
// 					{...viewport}
// 					{...mapStyle}
// 					onViewportChange={(viewport) => this.setState({ viewport })}
// 				>
// 					{tempMarker && (
// 						<Marker longitude={tempMarker.longitude} latitude={tempMarker.latitude}>
// 							<div className="marker temporary-marker">
// 								<span></span>
// 							</div>
// 						</Marker>
// 					)}
// 					{markers.map((marker, index) => {
// 						return <CustomMarker key={`marker-${index}`} index={index} marker={marker} />;
// 					})}

// 				</ReactMapGL>
// 				<NavigationControl />
// 			</div>
// 		);
// 	}
// }
// export default Home;

