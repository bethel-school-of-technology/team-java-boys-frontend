import React, { PureComponent } from "react";
import ReactMapGL, {Marker} from "react-map-gl";
import { Container, Col, Row, Button } from "reactstrap";
import Geocoder from "react-mapbox-gl-geocoder";
import './Home.css';

const mapStyle = {
	width: "80%",
	height: 600,
};

const mapboxApiKey = "pk.eyJ1IjoidGhlamF2YWJveXMiLCJhIjoiY2trNGsyYTd5MGMxYTJvdGh5MzJoZGNoaiJ9.5NRGHn_waxDVcG8__PJ_eA";

const params = {
    country: "us"
}

const CustomMarker = ({index, marker}) => {
	return (
	  <Marker
		longitude={marker.longitude}
		latitude={marker.latitude}>
		<div className="marker">
		  <span><b>{index + 1}</b></span>
		</div>
	  </Marker>
	)
  };

class Home extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
		  viewport: {
			latitude: 45.50884,
			longitude: -73.58781,
			zoom: 15
		  },
		  tempMarker: null,
		  markers:[]
		};
	
	  }
	
	  onSelected = (viewport, item) => {
		  this.setState({
			viewport,
			tempMarker: {
			  name: item.place_name,
			  longitude: item.center[0],
			  latitude: item.center[1]
			}
		  })
	  }
	
	  add = () => {
		var { tempMarker } = this.state
	
		this.setState(prevState => ({
			markers: [...prevState.markers, tempMarker],
			tempMarker: null
		}))
	  }
	
	  render() {
		const { viewport, tempMarker, markers } = this.state;
		return(
		  <Container fluid={true}>
			<Row>
			  <Col><h2>Yard Sale Locator</h2></Col>
			</Row>
			<Row className="py-4">
			  <Col xs={2}>
				<Geocoder
					mapboxApiAccessToken={mapboxApiKey}
					onSelected={this.onSelected}
					viewport={viewport}
					hideOnSelect={true}
					value=""
					queryParams={params}
				/>
			  </Col>
			  <Col>
			   <Button color="primary" onClick={this.add}>Add Marker</Button>
			  </Col>
			</Row>
			<Row>
			  <Col>
				<ReactMapGL
				  mapboxApiAccessToken={mapboxApiKey}
				  mapStyle="mapbox://styles/mapbox/streets-v11"
				  {...viewport}
				  {...mapStyle}
				  onViewportChange={(viewport) => this.setState({viewport})}
				>
				  { tempMarker &&
					<Marker
					  longitude={tempMarker.longitude}
					  latitude={tempMarker.latitude}>
					  <div className="marker temporary-marker"><span></span></div>
					</Marker>
				  }
				  {
					markers.map((marker, index) => {
					  return(
						<CustomMarker
						  key={`marker-${index}`}
						  index={index}
						  marker={marker}
						/>
					  )
					})
				  }
				</ReactMapGL>
			  </Col>
			</Row>
		  </Container>
	   );
	  }
	}
export default Home;
//Geocoding error, going another route...
// import React, { Component } from "react";
// import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
// import Geocoder from 'react-mapbox-gl-geocoder';

// class Home extends Component {
// 	state = {
// 		viewport: {
// 			width: "80vw",
// 			height: "60vh",
// 			longitude: -97.6807,
// 			latitude: 39.2215,
// 			zoom: 3.95,
// 		},
// 		userLocation: {},
// 	};

// 	setUserLocation = () => {
// 		navigator.geolocation.getCurrentPosition((position) => {
// 			let setUserLocation = {
// 				lat: position.coords.latitude,
// 				long: position.coords.longitude,
// 			};
// 			let newViewport = {
// 				height: "60vh",
// 				width: "80vw",
// 				latitude: position.coords.latitude,
// 				longitude: position.coords.longitude,
// 				zoom: 15,
// 			};
// 			this.setState({
// 				viewport: newViewport,
// 				userLocation: setUserLocation,
// 			});
// 		});
// 	};

// 	render() {
// 		return (
// 			<div className="App">

// 				<div>
// 				<Geocoder mapboxApiAccessToken="pk.eyJ1IjoidGhlamF2YWJveXMiLCJhIjoiY2trNGsyYTd5MGMxYTJvdGh5MzJoZGNoaiJ9.5NRGHn_waxDVcG8__PJ_eA" onSelect={this.onSelect} showLoader={true}/>
// 				<ReactMapGL
// 					{...this.state.viewport}
// 					mapStyle="mapbox://styles/mapbox/outdoors-v11"
// 					onViewportChange={(viewport) => this.setState({ viewport })}
// 					mapboxApiAccessToken="pk.eyJ1IjoidGhlamF2YWJveXMiLCJhIjoiY2trNGsyYTd5MGMxYTJvdGh5MzJoZGNoaiJ9.5NRGHn_waxDVcG8__PJ_eA"
// 				>
// 					{Object.keys(this.state.userLocation).length !== 0 ? (
// 						<Marker latitude={this.state.userLocation.lat} longitude={this.state.userLocation.long}>
// 							<img className="location-icon" alt="You are here." src='location-icon.svg'/>
// 						</Marker>
// 					) : (
// 						<div></div>
// 					)}
// 					<div style={{position:'absolute', right:1}}>
// 					<button onClick={this.setUserLocation}>My <br/> Cord</button>
// 						<NavigationControl/>
// 					</div>
// 				</ReactMapGL>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// export default Home;
