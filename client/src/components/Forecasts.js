import React, { PureComponent } from 'react';
import moment from 'moment';
import Skycons from '../vendor/skycons';
import { defer, get } from 'lodash-es';
var skycons = new Skycons();

class Forecasts extends PureComponent {
  renderForecast(forecast) {
    const { temperatureHigh, temperatureLow, time, icon } = forecast;
    const m = moment(time * 1000, 'x');

    defer(() => {
      skycons.add(`icon-${time}`, icon);
    });

    return (
      <div
        key={ forecast.time }
        className="forecast center">
        <div className="weekday">{ m.format('ddd') }</div>
        <div className="divider"></div>
        <div className="month">{ m.format('MMM') }</div>
        <div className="day">{ m.format('D') }</div>
        <div className="divider"></div>
        <div className="temp">
          { `${parseInt(temperatureHigh, 0)}` }<sup>°</sup>/
          { `${parseInt(temperatureLow, 0)}` }<sup>°</sup>
        </div>
        <canvas id={ `icon-${time}` } width="64" height="64"></canvas>
        <div>{ forecast.summary }</div>
      </div>
    );
  }

  render() {
    const { data } = this.props;

    if (!data.length) return null;

    const children = data.map((forecast) => {
      return this.renderForecast(get(forecast, 'daily.data.0'));
    });

    return (
      <div className="flex-1">
        { children }
      </div>
    )
  }
}

export default Forecasts;