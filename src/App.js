import 'babel-polyfill';
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import carto from 'carto.js';
import ReactGA from 'react-ga';
import States from './States';
import Country from './Country';
import IntroText from './IntroText';
import Details from './details/Details';
import Timeseries from './timeline/Timeseries';
import cartoMapData from './data/cartoMapData';
import {buildStyle} from './utils/styleFormatter';
import * as EventSystem from './EventSystem';
import EventType from './EventType';
import CountryList from './details/CountryList';
import CountryDetails from './details/CountryDetails';
import WorldMap from './maps/WorldMap';

export default class App extends Component {
    static ABOUT_PAGE = 'about';
    static ASSEMBLY_PAGE = 'assembly';

    constructor(props) {
        super(props);
        this.state = {
            state: States.state.LOADING,
        };

        // Init Google Analytics
        // ReactGA.initialize('UA-109735778-1');
    }

    /* eslint-disable */
    componentDidMount() {
        this.setState({nativeMap: this.nativeMap});
        EventSystem.subscribe(
            EventType.eventType.TIMESERIES_CHANGED,
            this.onDataChanged.bind(this));
    }

    /* eslint-enable */

    onDataChanged = (data) => {
        this.setState(data);
        const newStyle = buildStyle(data);
        this.setState({layerStyle: newStyle, hidelayers: false});
    };

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
    };
    showAboutPage = () => {
        this.setState({visibleOverlay: App.ABOUT_PAGE});

        // Record pageview
        ReactGA.set({page: window.location.pathname + window.location.search});
        ReactGA.modalview('/about/');
    };
    showAssemblyPage = () => {
        this.setState({visibleOverlay: App.ASSEMBLY_PAGE});
        ReactGA.modalview('/demo/');
    };
    renderTimeseries = () => (
        <Timeseries
            client={this.cartoClient}
            source={cartoMapData.source}
            nativeMap={this.state.nativeMap}
        />
    );

    render() {
        const LeftPanel = () => (
            <Switch>
                <Route exact path={'/'} component={IntroText} />
                <Route exact={false} path={'/countries'} component={CountryList} />
                <Route path={'/country/:countryCode'} component={CountryDetails} />
                <Route path={'/details/:number'} component={Details} />
            </Switch>
        );

        return (
            <div className="app-wrapper">
                <LeftPanel />
                <WorldMap />
            </div>
        );
    }
}
