import React, {Component} from 'react';
import {GeoJSON} from 'react-leaflet';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import L from 'leaflet';
import Constants from '../Constants';
import Modes from '../../Modes';
import Country from '../../Country';

export default class CountriesLayer extends Component {
    static get propTypes() {
        return {
            geoJSON: PropTypes.array,
            mode: PropTypes.string,
            selectedCountry: PropTypes.instanceOf(Country),
            date: PropTypes.instanceOf(Date),
            onModeChange: PropTypes.func,
            onBoundsChange: PropTypes.func,
            onInit: PropTypes.func,
        };
    }
    static get defaultProps() {
        return {
            geoJSON: [],
            mode: Modes.mode.WORLD,
            selectedCountry: new Country(),
            date: new Date(),
            onModeChange: () => {},
            onBoundsChange: () => {},
            onInit: () => {},
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            highlightedCountry: {
                name: null,
                reportCount: 0,
            },
        };
        this.countryLayers = [];
        window.onhashchange = this.onHashChange;
    }
    componentDidMount() {
        this.onHashChange();
        this.props.onInit(this.geoJSON.leafletElement.getBounds().pad(0.1));
    }
    onHashChange = () => {
        const parsedHash = queryString.parse(window.location.hash);
        const bounds = this.geoJSON.leafletElement.getBounds();
        if (parsedHash.country) {
            const countryLayer = this.getCountryLayer(parsedHash.country);
            if (countryLayer) {
                this.selectCountry(countryLayer);
            }
        } else {
            this.props.onModeChange(Modes.mode.WORLD, new Country());
            this.props.onBoundsChange(bounds);
        }
    };
    onEachFeature = (feature, layer) => {
        this.countryLayers.push(layer);
        layer.on({
            mouseover: this.highlightFeature,
            mouseout: this.resetHighlight,
            click: this.zoomToCountry,
        });
    };
    getCountryLayer = countryName =>
        (this.countryLayers.find(l => (l.feature.properties.name === countryName)));
    getStyle = feature => (this.props.mode === Modes.mode.WORLD ?
        this.getWorldModeStyle(feature) : this.getCountryModeStyle(feature));
    getCount(feature) {
        if (this.props.mode === Modes.mode.COUNTRY) {
            return Array.from(feature.properties.datesMap.values()).pop();
        }
        let latestDate;
        for (const date of feature.properties.datesMap.keys()) {
            if (date >= this.props.date) break;
            latestDate = date;
        }
        return feature.properties.datesMap.get(latestDate);
    }
    getWorldModeStyle(feature) {
        const isHighlighted = feature.properties.name === this.state.highlightedCountry.name;
        return {
            fillColor: Constants.instance.getColor(this.getCount(feature)),
            weight: isHighlighted ? 2 : 1,
            opacity: 1,
            color: isHighlighted ? '#666' : 'white',
            fillOpacity: 1,
        };
    }
    getCountryModeStyle(feature) {
        const isSelected = feature.properties.name === this.props.selectedCountry.name;
        return {
            fillColor: isSelected ? Constants.instance.getColor(this.getCount(feature)) : 0,
            weight: isSelected ? 2 : 1,
            opacity: 1,
            color: isSelected ? '#666' : '#DDD',
            fillOpacity: 1,
        };
    }
    zoomToCountry = (e) => {
        // leaflet does not update 'interactive' option
        // https://github.com/Leaflet/Leaflet/issues/5441
        // also overriding cursor in StatsMap.scss
        if (this.props.mode === Modes.mode.COUNTRY) return;
        const countryLayer = e.target;
        this.selectCountry(countryLayer);
        const hash = queryString.stringify({country: countryLayer.feature.properties.name});
        window.location.hash = '#' + hash;
    };
    selectCountry(countryLayer) {
        const selectedCountry = new Country(
            countryLayer.feature.properties.name,
            this.getCount(countryLayer.feature),
            countryLayer.feature.properties.reporters,
            countryLayer.feature.properties.trash_stats,
        );
        this.props.onModeChange(Modes.mode.COUNTRY, selectedCountry);
        this.props.onBoundsChange(countryLayer.getBounds());
    }
    resetHighlight = () => {
        this.setState({
            highlightedCountry: new Country(),
        });
    };
    highlightFeature = (e) => {
        // do not highlight country borders when one country is selected
        if (this.props.mode === Modes.mode.COUNTRY) {
            return;
        }
        const layer = e.target;
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        this.setState({
            highlightedCountry: {
                name: layer.feature.properties.name,
                reportCount: this.getCount(layer.feature),
            },
        });
    };
    render() {
        return (
            <GeoJSON
                ref={(r) => { this.geoJSON = r; }}
                data={this.props.geoJSON}
                style={this.getStyle}
                onEachFeature={this.onEachFeature}
            />
        );
    }
}
