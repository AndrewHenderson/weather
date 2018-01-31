import React, { Component } from 'react';
import moment from 'moment';
import { assign, get } from 'lodash-es';
import '../css/App.css';
import SearchBox from './SearchBox';
import Forecasts from './Forecasts';

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
        })
    });
  };

  setLocation(coords) {
    const time = moment().toISOString();

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

  render() {
    const { location, forecasts } = this.state;
    return (
      <div className="container">
        <SearchBox
          onSelection={ this.handlePlaceSelection }
        />
        <h3 className={ location ? null : 'hide' }>{ location }</h3>
        <Forecasts data={ forecasts } />
      </div>
    );
  }
}

export default App;
