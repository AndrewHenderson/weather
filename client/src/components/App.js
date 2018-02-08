import React, { Component } from 'react';
import moment from 'moment';
import { assign, get } from 'lodash-es';
import '../css/App.css';
import SearchBox from './SearchBox';
import Forecasts from './Forecasts';

let markers = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      forecasts: []
    }
  }

  handlePlaceSelection = (place) => {
    this.setState({
      location: place.description,
      isDropdownVisible: false
    }, () => {
      fetch('/place', {
        method: 'POST',
        body: place.place_id
      })
        .then((res) => {
          return res.json()
        })
        .then((json) => {
          const coords = get(json, 'result.geometry.location');
          this.setLocation(coords);
          this.setMarker(coords);
        })
    });
  };

  setLocation(coords) {
    const time = moment().toISOString();

    window.map.setCenter(coords);

    fetch('/weather', {
      method: 'POST',
      body: JSON.stringify(assign({
        time
      }, coords))
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        this.setState({
          forecasts: json
        });
      });
  }

  setMarker(coords) {
    // Clear old markers
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];
    // Set new marker
    markers.push(new window.google.maps.Marker({
      position: coords,
      map: window.map,
    }));
  }

  render() {
    const { location, forecasts } = this.state;
    return (
      <div className="container">
        <SearchBox
          onSelection={ this.handlePlaceSelection }
        />
        <div className="forecast-data">
          <h3 className={ location ? null : 'hide' }>{ location }</h3>
          <Forecasts data={ forecasts } />
        </div>
      </div>
    );
  }
}

export default App;
