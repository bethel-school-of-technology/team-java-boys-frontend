import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import MapGL from "react-map-gl";
import { Marker, NavigationControl, Popup } from "react-map-gl";
import axios from "axios";
import moment from 'moment';
import Geocoder from "react-map-gl-geocoder";

import { GeoJsonLayer } from "deck.gl";

const MAPBOX_TOKEN = "pk.eyJ1IjoidGhlamF2YWJveXMiLCJhIjoiY2trNGsyYTd5MGMxYTJvdGh5MzJoZGNoaiJ9.5NRGHn_waxDVcG8__PJ_eA";

class Home extends Component {
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

  

	async getPostData() {
		let axiosConfig = {
			headers: {
				Authorization: localStorage.getItem("userToken"),
			},
		};

		const res = await axios.get("http://localhost:8080/post", axiosConfig);
    
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

	resize = () => {
		this.handleViewportChange({
		  width: '90vw',
		  height: '80vh'
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
  
 

	addMarkers = () => {
		if(this.state.viewport.zoom >= 13){
			let yardSaleInformation = this.state.yardSaleInformation;
			for (var i = 0; i < yardSaleInformation.length; i++) {
				// console.log(parseInt(yardSaleInformation[i].latitude * 10) + ' ' + parseInt(this.state.userLocation.lat *10));
				// console.log(parseInt(yardSaleInformation[i].longitude* 10) + ' ' + parseInt(this.state.userLocation.long* 10));
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
					<br />
						<h2>Please zoom in to see results</h2>
						</div>
				);
		}
	}

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

