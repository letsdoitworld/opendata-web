import 'babel-polyfill';
import React, {Component} from 'react';
import {Map as RepMap, TileLayer as Basemap} from 'react-leaflet';
import carto from 'carto.js';
import ReactGA from 'react-ga';
import queryString from 'query-string';
import States from './States';
import Details from './details/Details';
import Modes from './Modes';
import Helpers from './Helpers';
import populationData from './json/country-by-population.json';
import Country from './Country';
import calculateTRI from './trashReportIndex';
import About from './overlay/about/About';
import AboutAssembly from './overlay/aboutUnEnvironmentAssembly/AboutAssembly';

import Layer from './maps/Layer';

import Timeseries from './timeline/Timeseries';
import cartoMapData from './data/cartoMapData';
import {buildStyle} from './utils/styleFormatter';

const CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png';

export default class App extends Component {
    static ABOUT_PAGE = 'about';
    static ASSEMBLY_PAGE = 'assembly';

    static getQueryObject(mode, selectedCountry) {
        if (mode === Modes.mode.ABOUT_ASSEMBLY) {
            return {demo: null};
        } else if (mode === Modes.mode.COUNTRY && selectedCountry.name) {
            return {country: selectedCountry.name};
        }
        return {};
    }

    static setWindowLocationHash(queryObject) {
        const hash = !queryObject ? '' : queryString.stringify(queryObject);
        window.location.hash = '#' + hash;
    }

    constructor(props) {
        const parsedHash = queryString.parse(window.location.hash);
        super(props);
        this.state = {
            state: States.state.LOADING,
            mode: parsedHash.country ? Modes.mode.COUNTRY : Modes.mode.WORLD,
            selectedCountry: new Country(),
            visibleOverlay: null,
            center: [40.42, -3.7],
            zoom: 13,
            nativeMap: undefined,
            layerStyle: cartoMapData.style,
            hidelayers: true,
        };
        this.onTimeseriesChanged = this.onTimeseriesChanged.bind(this);

        // Init Google Analytics
        ReactGA.initialize('UA-109735778-1');
    }

    /* eslint-disable */
    componentDidMount() {
        this.setState({nativeMap: this.nativeMap});
    }
    /* eslint-enable */

    onTimeseriesChanged(data) {
        const newStyle = buildStyle(data);
        this.setState({layerStyle: newStyle, hidelayers: false});
    }

    onModeChange = (mode, selectedCountry) => {
        if (this.state.visibleOverlay) {
            return;
        }
        if (!selectedCountry) {
            selectedCountry = new Country();
        }
        this.setState({
            mode,
            selectedCountry,
        });
        App.setWindowLocationHash(App.getQueryObject(mode, selectedCountry));

        // Record pageview
        if (selectedCountry.name) {
            const path = window.location.pathname + '#country=' + selectedCountry.name;
            ReactGA.set({page: path});
            ReactGA.pageview(path);
            ReactGA.event({
                category: 'Nav',
                action: 'Changed country',
                label: selectedCountry.name,
            });
        }
    };

    onTimelineChange(date, numberOfReports) {
        this.setState({
            currentDate: date,
            numberOfReports,
        });
    }
    cartoClient = new carto.Client({apiKey: '7947aa9e7fcdff0f5f8891a5f83b1e6fa6350687', username: 'worldcleanupday'});

    hideOverlay = () => {
        this.setState({visibleOverlay: null});
        App.setWindowLocationHash(App.getQueryObject(Modes.mode.WORLD));
    };
    showAboutPage = () => {
        this.setState({visibleOverlay: App.ABOUT_PAGE});

        // Record pageview
        ReactGA.set({page: window.location.pathname + window.location.search});
        ReactGA.modalview('/about/');
    };
    showAssemblyPage = () => {
        this.setState({visibleOverlay: App.ASSEMBLY_PAGE});
        App.setWindowLocationHash(App.getQueryObject(Modes.mode.ABOUT_ASSEMBLY));
        ReactGA.modalview('/demo/');
    };
    renderTimeseries = () => (
        <Timeseries
            client={this.cartoClient}
            source={cartoMapData.source}
            nativeMap={this.state.nativeMap}
            onDataChanged={this.onTimeseriesChanged}
        />
    );

    render() {
        const populationDataElement = populationData
            .find(e => e.country === this.state.selectedCountry.name);
        const population = populationDataElement ?
            Helpers.compactInteger(populationDataElement.population, 2) : '0';
        const trashReportIndex = calculateTRI(
            this.state.selectedCountry.reportCount,
            populationDataElement ? populationDataElement.population : 0,
        );
        const {center, nativeMap, zoom} = this.state;

        const runningScreen = (
            <div>
                <div id="wrapper">
                    <div>
                        <Details
                            country={this.state.selectedCountry}
                            trashReportIndex={trashReportIndex}
                            visible={this.state.mode === Modes.mode.COUNTRY}
                            population={population}
                        />
                    </div>
                    <div className="map-container">
                        <RepMap
                            center={center}
                            zoom={zoom}
                            ref={(node) => { this.nativeMap = node && node.leafletElement; }}
                        >
                            <Basemap attribution="" url={CARTO_BASEMAP} />

                            <Layer
                                source={cartoMapData.source}
                                style={this.state.layerStyle}
                                client={this.cartoClient}
                                hidden={this.state.hidelayers}
                            />
                        </RepMap>
                    </div>
                    <div className="timeseries-container">
                        {nativeMap && this.renderTimeseries()}
                    </div>
                </div>
                <About
                    visible={this.state.visibleOverlay === App.ABOUT_PAGE}
                    onClose={this.hideOverlay}
                />
                <AboutAssembly
                    visible={this.state.visibleOverlay === App.ASSEMBLY_PAGE}
                    onClose={this.hideOverlay}
                />
            </div>
        );
        return (
            <div className="App">

                {runningScreen}
            </div>
        );
    }
}
