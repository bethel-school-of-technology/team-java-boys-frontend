import React from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoidGhlamF2YWJveXMiLCJhIjoiY2trNGsyYTd5MGMxYTJvdGh5MzJoZGNoaiJ9.5NRGHn_waxDVcG8__PJ_eA";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lng: -97.6807,
			lat: 39.2215,
			zoom: 3.95,
		};
	}

	componentDidMount() {
		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [this.state.lng, this.state.lat],
			zoom: this.state.zoom,
		});

		map.on("move", () => {
			this.setState({
				lng: map.getCenter().lng.toFixed(4),
				lat: map.getCenter().lat.toFixed(4),
				zoom: map.getZoom().toFixed(2),
			});
		});
	}

	render() {
		return (
			<div>
                <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
				<div className="sidebarStyle">
					<div>
						Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}
					</div>
				</div>
				
			</div>
		);
	}
}

export default Home;
