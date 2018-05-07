
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import carto from 'carto.js';
import '../css/timeline/Timeseries.css';
import * as EventSystem from '../EventSystem';
import EventType from '../EventType';
import {buildStyle} from '../utils/styleFormatter';

class Timeseries extends Component {
    static propTypes = {
        client: PropTypes.object,
        source: PropTypes.string,
        nativeMap: PropTypes.object,
    }
    static get defaultProps() {
        return {
            client: this.client,
            source: this.source,
            nativeMap: this.nativeMap,
        };
    }

    constructor(props) {
        super(props);

        const dataset = new carto.source.SQL(props.source);
        const bboxFilter = new carto.filter.BoundingBoxLeaflet(props.nativeMap);

        this.timeseriesView = new carto.dataview.TimeSeries(dataset, 'ts', {
            offset: 0,
            aggregation: 'year',
        });
        this.timeseriesView.addFilter(bboxFilter);
        this.timeseriesView.on('dataChanged', (newData) => {
            EventSystem.publish(
                EventType.eventType.TIMESERIES_CHANGED,
                newData);
        });

        props.client.addDataview(this.timeseriesView);
    }

    state = {
        bins: [],
    }

    componentDidMount() {
        EventSystem.subscribe(
            EventType.eventType.TIMESERIES_CHANGED,
            this.onDataChanged.bind(this));
    }
    componentWillUnmount() {
        this.timeseriesView.off('dataChanged');
    }
    onDataChanged = (data) => {
        this.setState(data);
        const newStyle = buildStyle(data);
        this.setState({layerStyle: newStyle, hidelayers: false});
    }

    renderBins = () => this.state.bins.map((bin, index) => {
        const {freq, normalized} = bin;

        return (
            <li className="Timeseries-bin" key={`${index}-${freq}`}>
                <span className="Timeseries-bin--fill" style={{background: '#fcde9c', height: `${normalized * 100}%`}} />

            </li>
        );
    })

    render() {
        return (
            <div className="Timeseries">
                <ul className="Timeseries-bins">
                    {this.renderBins()}
                </ul>
            </div>
        );
    }
}

export default Timeseries;
