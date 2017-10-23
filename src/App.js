import 'babel-polyfill';
import React, {Component} from 'react';
import $ from 'jquery';
import * as moment from 'moment';
import classNames from 'classnames';
import queryString from 'query-string';
import StatsMap from './maps/StatsMap';
import TimeLine from './timeline/TimeLine';
import States from './States';
import LoadingScreen from './loading/LoadingScreen';
import ErrorScreen from './error/ErrorScreen';
import Details from './details/Details';
import Modes from './Modes';
import Helpers from './Helpers';
import populationData from './json/country-by-population.json';
import Country from './Country';
import calculateTRI from './trashReportIndex';
import About from './about/About';

export default class App extends Component {
    constructor(props) {
        const parsedHash = queryString.parse(window.location.hash);
        super(props);
        this.state = {
            state: States.state.LOADING,
            mode: parsedHash.country ? Modes.mode.COUNTRY : Modes.mode.WORLD,
            selectedCountry: new Country(),
            aboutPageVisible: false,
        };
        this.onTimelineChange = this.onTimelineChange.bind(this);
    }
    componentDidMount() {
        $.when(
            this.initGraphData(),
            this.initMapData(),
        ).done(() => {
            this.setState({
                state: States.state.LOADED,
            });
            Helpers.validatePopulationData(this.state.geoJSON, populationData);
        }).fail(() => {
            this.setState({
                state: States.state.ERROR,
            });
        });
    }
    onModeChange = (mode, selectedCountry) => {
        this.setState({
            mode,
            selectedCountry,
        });
    };
    onTimelineChange(date, numberOfReports) {
        this.setState({
            currentDate: date,
            numberOfReports,
        });
    }
    hideAboutPage = () => {
        this.setState({aboutPageVisible: false});
    };
    showAboutPage = () => {
        this.setState({aboutPageVisible: true});
    };
    initGraphData() {
        return $.get('/json/graphData.json', (data) => {
            data.data.forEach((e) => {
                e.day = new Date(e.day);
                e.number_of_reports = parseInt(e.number_of_reports, 10);
            });
            this.setState({
                graphData: data.data,
            });
        });
    }
    initMapData() {
        return $.get('/json/mapData.json').done((data) => {
            data.world.forEach((e) => {
                e.properties.datesMap = new Map();
                Object.entries(e.properties.dates).forEach(([key, value]) => {
                    e.properties.datesMap.set(moment(key).toDate(), parseInt(value, 10));
                });
                const transformRussiaPolygons = true;
                // hack to display Russia correctly
                if (transformRussiaPolygons && e.id === 'RUS') {
                    // https://stackoverflow.com/a/38537668
                    e.geometry.coordinates.forEach((a) => {
                        a.forEach((b) => {
                            b.forEach((c) => {
                                if (c[0] < -160) c[0] += 360;
                            });
                        });
                    });
                }
            });
            const removeAntarctica = true;
            if (removeAntarctica) {
                const antarcticaIndex = data.world.findIndex(e => e.id === 'ATA');
                if (antarcticaIndex > -1) data.world.splice(antarcticaIndex, 1);
            }
            this.setState({
                geoJSON: data.world,
            });
        });
    }
    render() {
        const wrapperClassNames = classNames(
            {'map-only': this.state.mode === Modes.mode.WORLD},
            {'map-with-details': this.state.mode === Modes.mode.COUNTRY},
        );
        const scrollingPanelClassNames = classNames(
            'scrolling-panel',
            {visible: this.state.mode === Modes.mode.COUNTRY},
        );
        const populationDataElement = populationData
            .find(e => e.country === this.state.selectedCountry.name);
        const population = populationDataElement ?
            Helpers.compactInteger(populationDataElement.population, 2) : '0';
        const trashReportIndex = calculateTRI(
            this.state.selectedCountry.reportCount,
            populationDataElement ? populationDataElement.population : 0,
        );
        const runningScreen = (
            <div>
                <div id="wrapper" className={wrapperClassNames}>
                    <div className="static-panel">
                        <StatsMap
                            numberOfReports={this.state.numberOfReports}
                            population={populationDataElement ?
                                populationDataElement.population : 0}
                            geoJSON={this.state.geoJSON}
                            date={this.state.currentDate}
                            onModeChange={this.onModeChange}
                            mode={this.state.mode}
                            selectedCountry={this.state.selectedCountry}
                            onAboutButtonClick={this.showAboutPage}
                        />
                        <TimeLine
                            mode={this.state.mode}
                            graphData={this.state.graphData}
                            onTimelineChange={this.onTimelineChange}
                        />
                    </div>
                    <div className={scrollingPanelClassNames}>
                        <Details
                            country={this.state.selectedCountry}
                            trashReportIndex={trashReportIndex}
                            visible={this.state.mode === Modes.mode.COUNTRY}
                            population={population}
                        />
                    </div>
                </div>
                <About
                    visible={this.state.aboutPageVisible}
                    onClose={this.hideAboutPage}
                />
            </div>
        );
        const showLoadingScreen = this.state.state === States.state.LOADING ||
            this.state.state === States.state.LOADED;
        return (
            <div className="App">
                {showLoadingScreen ? <LoadingScreen
                    loaded={this.state.state === States.state.LOADED}
                    onProceed={() => this.setState({state: States.state.RUNNING})}
                /> : null}
                {this.state.state === States.state.ERROR ? <ErrorScreen /> : null}
                {this.state.state === States.state.RUNNING ? runningScreen : null}
            </div>
        );
    }
}
