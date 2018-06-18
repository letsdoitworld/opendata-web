import 'babel-polyfill';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import carto from 'carto.js';
import {countries} from 'country-data';
import IntroText from './IntroText';
import CountryList from './details/CountryList';
import CountryDetails from './details/CountryDetails';
import WorldMap from './maps/WorldMap';
import AboutProject from './AboutProject';
import Download from './Download';
import Country from './Country';

class App extends Component {
    static propTypes = {
        location: PropTypes.object,
        apiURL: PropTypes.string,
    };

    static get defaultProps() {
        return {
            location: this.location,
            apiURL: 'https://opendata.wemakesoftware.eu/api',
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedCountry: {},
            selectedTrashPoint: {},
            updatedCountry: {},
            updatedTrashPoint: {},
            aboutClassName: (this.isAboutInfoRequired(props) ? 'about-shown' : 'hidden'),
            downloadClassName: (this.isDownloadPanelRequired(props) ? 'about-shown' : 'hidden'),
        };
        // Init Google Analytics
        // ReactGA.initialize('UA-109735778-1');
        this.loadСountriesData();
    }

    /* eslint-disable */
    async componentDidMount() {
        this.setState({nativeMap: this.nativeMap});
        if (this.isTrashPointDetailsRequired(this.props)) {
            await this.updateTrashpointsData(this.props);
        } else if (this.isCountryDetailsRequired(this.props)) {
            if (this.state.allCountries == null) {
                await this.loadСountriesData(this.props);
            }
            const countryCode = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1);
            this.loadCountryDetails(countryCode);
        } else if (this.isCountryListRequired(this.props)) {
            this.loadСountriesData();
        }
    }

    async loadTrashPointDetails(props) {
        const trashPointId = props.location.pathname.substring(props.location.pathname.lastIndexOf('/') + 1);
        console.log('loading trashpoint with id: ' + trashPointId);

        await fetch(this.props.apiURL  + '/trashpoint/' + trashPointId)
            .then(response => response.json())
            .then((data) => {

                if (data && data.sources) {

                    this.setState({selectedTrashPoint: data.sources[0]});
                }
            })
            .catch(err => console.error(this.state.url, err.toString()));
    }

    async loadCountryDetails(countryCode) {
        let clickedCountry = this.state.allCountries.find(o => o.code.toLowerCase() == countryCode);
        this.setState({selectedCountry: clickedCountry, updatedCountry: clickedCountry});
    }

    async updateTrashpointsData(props) {
        await this.loadTrashPointDetails(props);
        if (this.state.selectedTrashPoint.country_code != null) {
            await this.loadСountriesData();
            if (this.state.selectedCountry == null ||
                this.state.selectedCountry.code !== this.state.selectedTrashPoint.country_code) {
                await this.loadCountryDetails(
                    this.state.selectedTrashPoint.country_code.toLowerCase());
            }
        } else {
            this.setState({selectedCountry: null});
        }
        this.setState({updatedTrashPoint: this.state.selectedTrashPoint,  updatedCountry: this.state.selectedCountry});
    }

    async loadСountriesData() {

        if (this.state.countriesDataLoaded) {
            return;
        }

        await fetch( this.props.apiURL +  '/countries')
            .then(response => response.json())
            .then((data) => {
                console.log('countriesdata loaded');
                if (data.status === 'SUCCESS') {
                    const allCountries = data.sources.map(key =>
                        new Country(
                            countries[key.country_code].name,
                            key.country_code,
                            key.reports_number,
                            key.population,
                            key.tpr,
                            key.bb_x1,
                            key.bb_y1,
                            key.bb_x2,
                            key.bb_y2,
                            key.resources
                        ));
                    this.setState({allCountries, topCountries: allCountries.slice(0, 10), countriesDataLoaded: true});
                }
            })
            .catch(err => console.error(this.state.url, err.toString()));
    }

    isTrashPointDetailsRequired(props) {
        return props.location && props.location.pathname.startsWith('/details');
    }

    isCountryDetailsRequired(props) {
        return props.location && props.location.pathname.startsWith('/country');
    }

    isCountryListRequired(props) {
        return props.location && props.location.pathname.startsWith('/countries');
    }

    isAboutInfoRequired(props) {
        return props.location && props.location.pathname.startsWith('/about');
    }

    isDownloadPanelRequired(props) {
        return props.location && props.location.pathname.startsWith('/download');
    }


    /* eslint-enable */

    async componentWillReceiveProps(nextProps) {
        if (nextProps.location === this.props.location) {
            return false;
        }
        this.state.aboutClassName = 'hidden';
        this.state.downloadClassName = 'hidden';
        if (this.isTrashPointDetailsRequired(nextProps)) {
            await this.updateTrashpointsData(nextProps);
        } else if (this.isCountryDetailsRequired(nextProps)) {
            if (this.state.allCountries == null) {
                await this.loadСountriesData();
            }
            const countryCode = nextProps.location.pathname.substring(nextProps.location.pathname.lastIndexOf('/') + 1);
            this.loadCountryDetails(countryCode);
        } else if (this.isCountryListRequired(nextProps)) {
            this.loadСountriesData();
        } else if (this.isAboutInfoRequired(nextProps)) {
            this.state.aboutClassName = 'about-shown';
        } else if (this.isDownloadPanelRequired(nextProps)) {
            this.state.downloadClassName = 'about-shown';
        }
        return true;
    }

    cartoClient = new carto.Client({apiKey: '7947aa9e7fcdff0f5f8891a5f83b1e6fa6350687', username: 'worldcleanupday'});

    render() {
        const LeftPanel = () => (
            <Switch>
                <Route exact path={'/(|about|download)'} component={IntroText} />
                <Route
                    exact={false}
                    path={'/countries'}
                    render={
                        props =>
                            (<CountryList
                                allCountries={this.state.allCountries}
                                topCountries={this.state.topCountries}
                                {...props}
                            />)
                    }
                />
                <Route
                    path={'/country/:countryCode'}
                    render={
                        props =>
                            (<CountryDetails
                                selectedCountry={this.state.selectedCountry}
                                apiURL={this.props.apiURL}
                                selectedTrashPoint={null}
                                {...props}
                            />)}
                />
                <Route
                    path={'/details/:number'}
                    render={
                        props =>
                            (<CountryDetails
                                selectedCountry={this.state.selectedCountry}
                                apiURL={this.props.apiURL}
                                selectedTrashPoint={this.state.selectedTrashPoint}
                                {...props}
                            />)}
                />
            </Switch>
        );

        return (
            <div>
                { this.state.countriesDataLoaded && (
                    <div className="app-wrapper">
                        <LeftPanel />
                        <AboutProject aboutClassName={this.state.aboutClassName} />
                        <Download
                            downloadClassName={this.state.downloadClassName}
                            allCountries={this.state.allCountries.sort((key, key1) => key.name.localeCompare(key1.name))}
                            apiURL={this.props.apiURL}
                        />
                        <WorldMap selectedTrashPoint={this.state.updatedTrashPoint} selectedCountry={this.state.updatedCountry} />
                    </div>
                )}
            </div>
        );
    }
}
export default withRouter(App);
