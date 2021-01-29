import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import MapGL from "react-map-gl";
import { Marker, NavigationControl, Popup } from "react-map-gl";
import axios from "axios";
// import Geocode from "react-geocode";

const MAPBOX_TOKEN = "pk.eyJ1IjoidGhlamF2YWJveXMiLCJhIjoiY2trNGsyYTd5MGMxYTJvdGh5MzJoZGNoaiJ9.5NRGHn_waxDVcG8__PJ_eA";

class Home extends Component {
	state = {
		viewport: {
			width: "80vw",
			height: "80vh",
			latitude: 37.7577,
			longitude: -122.4376,
			zoom: 8,
		},
		userLocation: {},
		yardSaleLocations: [],
		yardSaleCoords: [],
		selectedSale: null,
	};

	async getPostData() {
		let axiosConfig = {
			headers: {
				Authorization: localStorage.getItem("userToken"),
			},
		};

		const res = await axios.get("http://localhost:8080/post", axiosConfig);
		let data = res.data;
		let address = [];
		for (var i = 0; i < data.length; i++) {
			address.push(data[i].streetAddress + " " + data[i].city + " " + data[i].state + " " + data[i].zip);
			this.setState({ yardSaleLocations: address });
		}
		// console.log(this.state.yardSaleLocations);
		this.getYardsSaleCoords();
	}

	componentDidMount() {
		this.getPostData();
	}

	setUserLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			let setUserLocation = {
				lat: position.coords.latitude,
				long: position.coords.longitude,
			};
			let newViewport = {
				height: "80vh",
				width: "80vw",
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				zoom: 10,
			};
			this.setState({
				viewport: newViewport,
				userLocation: setUserLocation,
			});
		});
	};

	async getYardsSaleCoords() {
		let yardSaleLocations = this.state.yardSaleLocations;
		let coordsArray = [];
		console.log(yardSaleLocations);
		for (var i = 0; i < yardSaleLocations.length; i++) {
			const res = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?", {
				params: {
					address: yardSaleLocations[i],
					key: "AIzaSyAjdutfxpJvuPljbVNmz9Zh8YlWkYg9eNQ",
				},
			});

			let data = res.data.results[0].geometry.location;
			coordsArray.push(data);
			// console.log(data);
		}
		this.setState({ yardSaleCoords: coordsArray });
		console.log(this.state.yardSaleCoords);
	}

	addMarkers = () => {
		let yardSaleCoords = this.state.yardSaleCoords;
		for (var i = 0; i < yardSaleCoords.length; i++) {
			return this.state.yardSaleCoords.map((spot) => {
				return (
					<Marker key={spot.objectid} latitude={parseFloat(spot.lat)} longitude={parseFloat(spot.lng)}>
						<img
							onClick={() => {
								this.setSelectedSale(spot);
							}}
							src="location-icon5.png"
							alt="Im here"
							style={{ width: "28px", height: "40px" }}
						/>
					</Marker>
				);
			});
		}
	};

	setSelectedSale = (object) => {
		this.setState({ selectedSale: object });
	};

	closePopup = () => {
		this.setState({
			selectedSale: null,
		});
	};

	render() {
		return (
			<div className="Home">
				<MapGL
					{...this.state.viewport}
					mapStyle="mapbox://styles/mapbox/outdoors-v11"
					mapboxApiAccessToken={MAPBOX_TOKEN}
					onViewportChange={(viewport) => this.setState({ viewport })}
				>
					{Object.keys(this.state.userLocation).length !== 0 ? (
						<Marker latitude={this.state.userLocation.lat} longitude={this.state.userLocation.long}>
							<img src="location-icon4.png" alt="Im here" style={{ width: "28px", height: "40px" }} />
						</Marker>
					) : (
						<div></div>
					)}
					{this.addMarkers()}
					{this.state.selectedSale !== null ? (
						<Popup
							latitude={parseFloat(this.state.selectedSale.lat)}
							longitude={parseFloat(this.state.selectedSale.lng)}
							onClose={this.closePopup}
						>
							<p>Yard Sale Information</p>
						</Popup>
					) : null}
					<div style={{ position: "absolute", right: 1 }}>
						<button onClick={this.setUserLocation}>My Location</button>
						<NavigationControl />
					</div>
				</MapGL>
			</div>
		);
	}
}
export default Home;

// WORKING VERSION BEFORE ADDING MARKERS
// const Home = () => {
//   const [viewport, setViewport] = useState({
//     latitude: 37.7577,
//     longitude: -122.4376,
//     zoom: 8
//   });
//   const geocoderContainerRef = useRef();
//   const mapRef = useRef();
//   const handleViewportChange = useCallback(
//     (newViewport) => setViewport(newViewport),
//     []
//   );

//   const handleGeocoderViewportChange = useCallback(
//     (newViewport) => {
//       const geocoderDefaultOverrides = { transitionDuration: 500 };

//       return handleViewportChange({
//         ...newViewport,
//         ...geocoderDefaultOverrides
//       });
//     },
//     [handleViewportChange]
//   );

//   return (
//     <div style={{ height: "100vh" }}>
//       <div ref={geocoderContainerRef} style={{ width: "100%" }}/>
//       <MapGL
//         ref={mapRef}
//         {...viewport}
//         width="80%"
//         height="80%"
//         onViewportChange={handleViewportChange}
// 		mapboxApiAccessToken={MAPBOX_TOKEN}
// 		mapStyle="mapbox://styles/mapbox/streets-v11"
//       >
// 		  <div style={{position:'absolute', right:1}}>
// 		<NavigationControl/>
//         		</div>
//       </MapGL>
// 	  <Geocoder
//           mapRef={mapRef}
//           containerRef={geocoderContainerRef}
//           onViewportChange={handleGeocoderViewportChange}
//           mapboxApiAccessToken={MAPBOX_TOKEN}
//         />
//     </div>
//   );
// };

// export default Home

//VERSION 4, Not functioning completely
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
