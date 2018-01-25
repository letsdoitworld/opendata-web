import React, {Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Control from 'react-leaflet-control';
import {Map} from 'react-leaflet';
import Legend from './Legend/Legend';
import Heading from './Heading/Heading';
import Counter from './Counter/Counter';
import DateControl from './DateControl/DateControl';
import CloseButton from './CloseButton/CloseButton';
import Modes from '../Modes';
import CountriesLayer from './CountriesLayer/CountriesLayer';
import TrashReportIndex from './TrashReportIndex/TrashReportIndex';
import calculateTRI from '../trashReportIndex';
import Country from '../Country';
import AboutButton from '../overlay/about/AboutButton';
import AboutEnvAssemblyButton from '../overlay/aboutUnEnvironmentAssembly/AboutAssemblyButton';

export default class StatsMap extends Component {
    static get propTypes() {
        return {
            date: PropTypes.instanceOf(Date),
            numberOfReports: PropTypes.number,
            population: PropTypes.number,
            geoJSON: PropTypes.array,
            mode: PropTypes.string,
            onModeChange: PropTypes.func,
            onAboutButtonClick: PropTypes.func,
            onAssemblyButtonClick: PropTypes.func,
            selectedCountry: PropTypes.instanceOf(Country),
        };
    }
    static get defaultProps() {
        return {
            date: new Date(),
            numberOfReports: 0,
            population: 0,
            geoJSON: [],
            mode: Modes.mode.WORLD,
            onModeChange: () => {},
            onAboutButtonClick: () => {},
            onAssemblyButtonClick: () => {},
            selectedCountry: new Country(),
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            bounds: [[0, 0], [180, 180]],
            zoom: 2,
        };
        this.onBoundsChange = this.onBoundsChange.bind(this);
        $(document).keyup((e) => {
            if (e.keyCode === 27) { // escape key
                this.resetSelectedCountry();
            }
        });
    }
    componentDidMount() {
        if (this.props.mode === Modes.mode.WORLD) {
            this.enableMap();
        } else {
            this.disableMap();
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.map && this.props.mode !== nextProps.mode) {
            this.map.leafletElement.invalidateSize();
            if (nextProps.mode === Modes.mode.WORLD) {
                this.enableMap();
            } else {
                this.disableMap();
            }
        }
    }
    onBoundsChange = (bounds) => {
        this.setState({
            bounds,
        });
    };
    setMaxBounds = (maxBounds) => {
        this.setState({
            maxBounds,
        });
    };
    // for some reason passing these options to Map component
    // directly does not work (only on init, not updating on mode change)
    enableMap = () => {
        if (!this.map) return;
        this.map.leafletElement.dragging.enable();
        this.map.leafletElement.touchZoom.enable();
        this.map.leafletElement.doubleClickZoom.enable();
        this.map.leafletElement.scrollWheelZoom.enable();
        this.map.leafletElement.boxZoom.enable();
        this.map.leafletElement.keyboard.enable();
        if (this.map.leafletElement.tap) this.map.leafletElement.tap.enable();
        document.getElementById('map').style.cursor = 'grab';
    };
    disableMap = () => {
        if (!this.map) return;
        this.map.leafletElement.dragging.disable();
        this.map.leafletElement.touchZoom.disable();
        this.map.leafletElement.doubleClickZoom.disable();
        this.map.leafletElement.scrollWheelZoom.disable();
        this.map.leafletElement.boxZoom.disable();
        this.map.leafletElement.keyboard.disable();
        if (this.map.leafletElement.tap) this.map.leafletElement.tap.disable();
        document.getElementById('map').style.cursor = 'default';
    };
    loadingText = () => (
        <div>Loading...</div>
    );
    resetSelectedCountry = () => {
        this.props.onModeChange(Modes.mode.WORLD);
        this.setState({
            bounds: this.state.maxBounds,
        });
    };
    render() {
        const {selectedCountry, population, numberOfReports, mode, date} = this.props;
        const trashReportIndex = calculateTRI(selectedCountry.reportCount, population);
        const position = [0, 0];
        const topLeftControl = mode === Modes.mode.WORLD ?
            <Heading text={'Illegal trash reports'} /> : <Heading text={this.props.selectedCountry.name} />;
        const topRightControl = mode === Modes.mode.WORLD ?
            (
                <div>
                    <div>
                        <AboutButton onClick={this.props.onAboutButtonClick} />
                        <Legend />
                    </div>
                    <AboutEnvAssemblyButton onClick={this.props.onAssemblyButtonClick} />
                </div>
            ) : <CloseButton onClick={this.resetSelectedCountry} />;
        const bottomLeftControl = mode === Modes.mode.WORLD ?
            <DateControl date={date} /> : <TrashReportIndex index={trashReportIndex} />;
        const bottomRightControl = mode === Modes.mode.WORLD ?
            <Counter numberOfReports={numberOfReports.toLocaleString()} /> : <div />;
        return (
            <div id="map">
                {this.props.geoJSON.length === 0 ?
                    <this.loadingText /> :
                    <Map
                        ref={(r) => { this.map = r; }}
                        center={position}
                        zoom={this.state.zoom}
                        zoomControl={false}
                        attributionControl={false}
                        bounds={this.state.bounds}
                        maxBounds={this.state.maxBounds}
                        maxBoundsViscosity={1}
                        minZoom={2}
                        maxZoom={8}
                    >
                        <CountriesLayer
                            geoJSON={this.props.geoJSON}
                            mode={mode}
                            selectedCountry={this.props.selectedCountry}
                            date={date}
                            onModeChange={this.props.onModeChange}
                            onBoundsChange={this.onBoundsChange}
                            onInit={this.setMaxBounds}
                        />
                        <div className="map-gradient top" />
                        <div className="map-gradient bottom" />
                        <Control position="topleft">
                            {topLeftControl}
                        </Control>
                        <Control position="topright">
                            {topRightControl}
                        </Control>
                        <Control position="bottomleft">
                            {bottomLeftControl}
                        </Control>
                        <Control position="bottomright">
                            {bottomRightControl}
                        </Control>
                    </Map>
                }
            </div>
        );
    }
}
