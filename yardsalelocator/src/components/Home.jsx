import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import MapGL from "react-map-gl";
import { Marker, NavigationControl, Popup } from "react-map-gl";
import axios from "axios";
import moment from 'moment';
import Geocoder from "react-map-gl-geocoder";

import DeckGL, { GeoJsonLayer } from "deck.gl";

const MAPBOX_TOKEN = "pk.eyJ1IjoidGhlamF2YWJveXMiLCJhIjoiY2trNGsyYTd5MGMxYTJvdGh5MzJoZGNoaiJ9.5NRGHn_waxDVcG8__PJ_eA";

class Home extends Component {
	state = {
		viewport: {
			width: 400,
			height: 400,
			latitude: 37.7577,
			longitude: -122.4376,
			zoom: 8,
		},
		userLocation: {},
    selectedSale: null,
		yardSaleLocations: [],
		yardSaleCoords: [],
    yardSaleInformation: [],
    combinedStates: [],
    searchResultLayer: null
  };

  mapRef = React.createRef();

  combineStates = () => {
    let combinedData3= [];
    let yardSaleInformation = this.state.yardSaleInformation;
    for(var i=0; i < yardSaleInformation.length ; i++){
      let yardSaleCoords = this.state.yardSaleCoords[i];
      // console.log(yardSaleCoords);
      let yardSaleLocations = {address: this.state.yardSaleLocations[i]};
      // console.log(yardSaleLocations);
      // console.log(yardSaleInformation[i]);
      const combinedData=Object.assign(yardSaleInformation[i], yardSaleLocations );
      const combinedData2=Object.assign(combinedData, yardSaleCoords );
      combinedData3.push(combinedData2);
      this.setState({ combinedStates: combinedData3})
    };
    this.checkState();   
  }
  
  checkState = () => {
    console.log(this.state);
  };

	async getPostData() {
		let axiosConfig = {
			headers: {
				Authorization: localStorage.getItem("userToken"),
			},
		};

		const res = await axios.get("http://localhost:8080/post", axiosConfig);
    
    let postDateData = res.data;
		console.log(postDateData);
		let validPost=[];
		for(var i = 0; i < postDateData.length; i++){
			let endPostDate = (moment(postDateData[i].endDate).format());
			console.log(endPostDate);
			let todaysDate= (moment(new Date()).format());
			console.log(todaysDate);
			if(todaysDate <= endPostDate){
				console.log(endPostDate + " is after " + todaysDate);
				validPost.push(postDateData[i]);
			} 
    };
    
		let address = [];
		for (i = 0; i < validPost.length; i++) {
			address.push(validPost[i].streetAddress + " " + validPost[i].city + " " + validPost[i].state + " " + validPost[i].zip);
      this.setState({ yardSaleLocations: address });
    }
    this.setState({ yardSaleInformation: validPost });
    this.getYardsSaleCoords();
	}

	resize = () => {
		this.handleViewportChange({
		  width: window.innerWidth,
		  height: window.innerHeight
		});
	  };
	
	  handleViewportChange = viewport => {
		this.setState({
		  viewport: { ...this.state.viewport, ...viewport }
		});
	  };
	
	
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
		for (var i = 0; i < yardSaleLocations.length; i++) {
			const res = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?", {
				params: {
					address: yardSaleLocations[i],
					key: "AIzaSyAjdutfxpJvuPljbVNmz9Zh8YlWkYg9eNQ",
				},
			});

			let data = res.data.results[0].geometry.location;
			coordsArray.push(data);
		}
    this.setState({ yardSaleCoords: coordsArray });
    this.combineStates();
  }
  
 

	addMarkers = () => {
		let combinedStates = this.state.combinedStates;
		for (var i = 0; i < combinedStates.length; i++) {
			return this.state.combinedStates.map((spot) => {
				return (
					<Marker key={spot.lat} latitude={parseFloat(spot.lat)} longitude={parseFloat(spot.lng)}>
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
    console.log(this.state.selectedSale);
	};

	closePopup = () => {
		this.setState({
			selectedSale: null,
		});
	};

	render() {
		const { viewport, searchResultLayer } = this.state;
		return (
			<div className="Home">
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
							latitude={parseFloat(this.state.selectedSale.lat)}
							longitude={parseFloat(this.state.selectedSale.lng)}
              onClose={this.closePopup}
						>
							<p><b>Address: </b>{this.state.selectedSale.address}</p>
							<p><b>Categories: </b>{this.state.selectedSale.categories}</p>
							<p><b>Dates: </b>{moment(this.state.selectedSale.startDate).format("MMM Do YYYY")} to {moment(this.state.selectedSale.endDate).format("MMM Do YYYY")}</p>
							<p><b>Time: </b>{moment(this.state.selectedSale.startTime).format("h:mm:ss a")} to {moment(this.state.selectedSale.endTime).format("h:mm:ss a")}</p>
						</Popup>
					) : null}
					<DeckGL {...viewport} layers={[searchResultLayer]} />
					<div style={{ position: "absolute", right: 1 }}>
						<button onClick={this.setUserLocation}>My Location</button>
						</div>
						<div style={{ position: "absolute", right: 1, top:28 }}>
						<NavigationControl />
					</div>
				</MapGL>
			</div>
		);
	}
}
export default Home;

