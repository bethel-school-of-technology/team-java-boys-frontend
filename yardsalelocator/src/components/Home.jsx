import React, { PureComponent } from 'react';
import ReactMapGL from 'react-map-gl';
import Geocoder from 'react-mapbox-gl-geocoder';
import { Container, Col, Row } from 'reactstrap';

const mapStyle = {
    width: '100%',
    height: 600
}

const mapboxApiKey = 'pk.eyJ1IjoidGhlamF2YWJveXMiLCJhIjoiY2trNGsyYTd5MGMxYTJvdGh5MzJoZGNoaiJ9.5NRGHn_waxDVcG8__PJ_eA'

const params = {
    country: 'us'
}

class Home extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 39.2215,
        longitude: -97.6807,
		zoom: 3.95
      }
    };

  }

  onSelected = (viewport, item) => {
      this.setState({
        viewport
      })
  }

  render() {
    const { viewport } = this.state;
    return(
      <Container fluid={true}>
        <Row className="py-4">
          <Col xs={2}>
          <Col><p>Insert address, zip code, or city/state below</p></Col>
            <Geocoder
                mapboxApiAccessToken={mapboxApiKey}
                onSelected={this.onSelected}
                viewport={viewport}
                hideOnSelect={true}
                value=""
                queryParams={params}
            />
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
            </ReactMapGL>
          </Col>
        </Row>
      </Container>
   );
  }
}

export default Home;

//Reworked to add geocoder (Search bar)
// import React from "react";
// import ReactMapGL from 'react-map-gl';
// import { Container, Col, Row } from 'reactstrap';

// const mapboxApiKey  = "pk.eyJ1IjoidGhlamF2YWJveXMiLCJhIjoiY2trNGsyYTd5MGMxYTJvdGh5MzJoZGNoaiJ9.5NRGHn_waxDVcG8__PJ_eA";

// const mapStyle = {
//     width: '100%',
//     height: 600
// }

// class Home extends PureComponent  {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			lng: -97.6807,
// 			lat: 39.2215,
// 			zoom: 3.95,
// 		};
// 	}

// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 		  viewport: {
// 			latitude: 39.2215,
// 			longitude: -97.6807,
// 			zoom: 3.95
// 		  }
// 		};
	
// 	  }
	
// 	  render() {
// 		const { viewport } = this.state;
// 		return(
// 		  <Container fluid={true}>
// 			<Row>
// 			  <Col><h2>Mapbox Tutorial</h2></Col>
// 			</Row>
// 			<Row>
// 			  <Col>
// 				<ReactMapGL
// 				  mapboxApiAccessToken={mapboxApiKey}
// 				  mapStyle="mapbox://styles/mapbox/streets-v11"
// 				  {...viewport}
// 				  {...mapStyle}
// 				  onViewportChange={(viewport) => this.setState({viewport})}
// 				>
// 				</ReactMapGL>
// 			  </Col>
// 			</Row>
// 		  </Container>
// 	   );
// 	  }
// 	}

// export default Home;
