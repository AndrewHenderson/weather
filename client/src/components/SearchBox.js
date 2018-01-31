import React, { Component } from 'react';
import { debounce, delay } from 'lodash-es';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      isDropdownVisible: false,
    }
  }

  handleInputFocus = () => {
    const { places } = this.state;

    if (places.length && this.input.value.length) {
      this.setState({
        isDropdownVisible: true
      });
    }
  };

  handleInputBlur = () => {
    delay(() => {
      this.setState({
        isDropdownVisible: false
      });
    }, 150);
  };

  handleInputChange = () => {
    fetch('/places', {
      method: 'POST',
      body: this.input.value
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        this.setState({
          places: json,
          isDropdownVisible: true
        })
      })
  };

  renderPlaces() {
    const { places, isDropdownVisible } = this.state;

    const children = places.map((place) => {
      return (
        <li
          key={ place.id }
          onClick={ () => this.props.onSelection(place) }
        >{ place.description }</li>
      )
    });
    const classNames = ['dropdown'];

    if (!isDropdownVisible) {
      classNames.push('hide');
    }

    return (
      <ul className={ classNames.join(' ') }>
        { children }
      </ul>
    );
  }

  render() {
    return (
      <div className="searchbox">
        <input
          type="text"
          ref={ (node) => { this.input = node; } }
          onFocus={ this.handleInputFocus }
          onBlur={ this.handleInputBlur }
          onInput={ debounce(() => this.handleInputChange(), 200, {
            leading: false,
            trailing: true
          }) }
          placeholder="Search by city"
        />
        { this.renderPlaces() }
      </div>
    )
  }
}

export default SearchBox;