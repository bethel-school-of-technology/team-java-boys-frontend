import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import MapGL from "react-map-gl";
import { Marker, NavigationControl, Popup } from "react-map-gl";
import axios from "axios";
import moment from 'moment';
import Geocoder from "react-map-gl-geocoder";
import "./Home.css";
import { GeoJsonLayer } from "deck.gl";

const MAPBOX_TOKEN = "pk.eyJ1IjoidGhlamF2YWJveXMiLCJhIjoiY2trNGsyYTd5MGMxYTJvdGh5MzJoZGNoaiJ9.5NRGHn_waxDVcG8__PJ_eA";

class Home extends Component {
	//states being used; 
	//initial viewport is for the map properties 
	//userLocation is the browser location of the user to narrow down the inital map display (if appplicable)
	//selectedSale is for the popup information when a user clicks on a marker
	//yardsaleinformation is the listings of yard sale posts from the DB
	//searchresultslayer is for the deocoding search results
	state = {
		viewport: {
			width: '90vw',
			height: '80vh',
			latitude: 37.7577,
			longitude: -122.4376,
			zoom: 8,
		},
		userLocation: {},
    selectedSale: null,
    yardSaleInformation: [],
    searchResultLayer: null
  };

  mapRef = React.createRef();

  
//getPostData() retrieves the yard sale posting information from the DB, filters it according to endDate vs current date, and does not add outdated posting to the state yardSaleInformation
	async getPostData() {
		let axiosConfig = {
			headers: {
				Authorization: localStorage.getItem("userToken"),
			},
		};

		const res = await axios.get("http://localhost:8080/post", axiosConfig);
    
		//initial filtration of post data for current dates only
	let postDateData = res.data;
		let validPost=[];
		for(var i = 0; i < postDateData.length; i++){
			let endPostDate = (moment(postDateData[i].endDate).format());
			let todaysDate= (moment(new Date()).format());
			if(todaysDate <= endPostDate){;
				validPost.push(postDateData[i]);
			} 
    };
    this.setState({ yardSaleInformation: validPost });
	// console.log(this.state);
	}

	//resize() keeps the constant frame size of the map, makes it responsive
	resize = () => {
		this.handleViewportChange({
		  width: '90vw',
		  height: '80vh'
		});
	  };
	
	  //handleViewportChange updates the state when a user moves the map, required to prevent the map from "snapping" back to state settings
	  handleViewportChange = viewport => {
		this.setState({
		  viewport: { ...this.state.viewport, ...viewport }
		});		
	  };
	
	//Geocode (address earch field) state change for the searched results from user
	  handleOnResult = event => {
		this.setState({
		  searchResultLayer: new GeoJsonLayer({
			id: "search-result",
			data: event.result.geometry,
			getFillColor: [255, 0, 0, 128],
			getRadius: 1000,
			pointRadiusMinPixels: 10,
			pointRadiusMaxPixels: 10
		  })
		});
	  };

	componentDidMount() {
    this.getPostData();
    this.setUserLocation();
    window.addEventListener("resize", this.resize);
    this.resize();
	}
	componentWillUnmount() {
	  window.removeEventListener("resize", this.resize);
	}

	//setUserLocation(): receives the user location from their browser information and sets the initial view of the map to it. It also updates the viewport to their location.
	setUserLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			let setUserLocation = {
				lat: position.coords.latitude,
				long: position.coords.longitude,
			};
			let newViewport = {
				height: "80vh",
				width: "90vw",
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				zoom: 13,
			};
			this.setState({
				viewport: newViewport,
				userLocation: setUserLocation,
			});
		});
	};
  
 
//addMarkers() takes the yardSaleInformation state, filters them by the longitude and latitude (whole number no decimals), and then applies a marker for each location to the map.
	addMarkers = () => {
		//if statement will only populate markers if the user is zoomed in far enough
		if(this.state.viewport.zoom >= 13){
			let yardSaleInformation = this.state.yardSaleInformation;
			//for -> if statement cycles through the post information and will only apply markers that are within the user viewport range
			for (var i = 0; i < yardSaleInformation.length; i++) {
				if((parseInt(yardSaleInformation[i].latitude) === parseInt(this.state.viewport.latitude)) && (parseInt(yardSaleInformation[i].longitude) === parseInt(this.state.viewport.longitude)) ) {
				return this.state.yardSaleInformation.map(spot => {
					return (
						<Marker key={spot.id} latitude={parseFloat(spot.latitude)} longitude={parseFloat(spot.longitude)}>
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
			}
		} else {
				return (
					<div className="zoomrequest">
						<h2>Please zoom in to see results</h2>
						</div>
				);
		}
	}

	//user clicking on a marker sets the state for selectedSale
	setSelectedSale = (object) => {
	this.setState({ selectedSale: object });
	};

	closePopup = () => {
		this.setState({
			selectedSale: null,
		});
	};

	render() {
		const { viewport } = this.state;
		return (
			<div className="home">
				<MapGL
				mapStyle="mapbox://styles/mapbox/outdoors-v11"
        ref={this.mapRef}
        {...viewport}
        onViewportChange={this.handleViewportChange}
		mapboxApiAccessToken={MAPBOX_TOKEN}
				>
				<Geocoder
          mapRef={this.mapRef}
          onResult={this.handleOnResult}
          onViewportChange={this.handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
		  countries= 'us'
        />
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
							latitude={parseFloat(this.state.selectedSale.latitude)}
							longitude={parseFloat(this.state.selectedSale.longitude)}
              onClose={this.closePopup}
						>
							<p><b>Address: </b>{this.state.selectedSale.address}</p>
							<p><b>Categories: </b>{this.state.selectedSale.categories}</p>
							<p><b>Dates: </b>{moment(this.state.selectedSale.startDate).format("MMM Do YYYY")} to {moment(this.state.selectedSale.endDate).format("MMM Do YYYY")}</p>
							<p><b>Time: </b>{moment(this.state.selectedSale.startTime).format("h:mm:ss a")} to {moment(this.state.selectedSale.endTime).format("h:mm:ss a")}</p>
						</Popup>
					) : null}
					<div className="locationButton" style={{ position: "absolute", right: 1 }}>
						<button onClick={this.setUserLocation}>My Location</button>
						</div>
						<div className="navigationButton" style={{ position: "absolute", right: 1 }}>
						<NavigationControl />
					</div>
				</MapGL>
			</div>
		);
	}
}
export default Home;

