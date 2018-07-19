import 'babel-polyfill';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import carto from 'carto.js';
import {countries} from 'country-data';
import IntroText from './IntroText';
import GetInvolved from './GetInvolved';
import CountryList from './details/CountryList';
import CountryDetails from './details/CountryDetails';
import WorldMap from './maps/WorldMap';
import AboutProject from './AboutProject';
import Download from './Download';
import Country from './Country';
import ReadMore from './ReadMore';

class App extends Component {
    static propTypes = {
        location: PropTypes.object,
        apiURL: PropTypes.string,
        cartoApiKey: PropTypes.string,
        cartoUsername: PropTypes.string,
    };

    static get defaultProps() {
        return {
            location: this.location,
            apiURL: 'https://opendata.wemakesoftware.eu/api',
            cartoApiKey: '7947aa9e7fcdff0f5f8891a5f83b1e6fa6350687',
            cartoUsername: 'worldcleanupday',
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
            getInvolvedClassName: (this.isGetInvolvedRequired(props) ? 'about-shown' : 'hidden'),
            readMoreClassName: (this.isReadMoreRequired(props) ? 'about-shown' : 'hidden'),
        };
        this.loadCountriesData();
        this.loadReportsCounter();
        this.loadResourcesData();
    }

    /* eslint-disable */
    async componentDidMount() {

        this.setState({nativeMap: this.nativeMap});
        if (this.isTrashPointDetailsRequired(this.props)) {
            await this.updateTrashpointsData(this.props);
        } else if (this.isCountryDetailsRequired(this.props)) {
            if (this.state.allCountries == null) {
                await this.loadCountriesData(this.props);
            }
            const countryCode = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1);
            this.loadCountryDetails(countryCode);
        } else if (this.isCountryListRequired(this.props)) {
            this.loadCountriesData();
        }
    }

    async loadResourcesData() {
        const resources = await this.loadData('/resources', (data) => data.sources);
        this.setState({resources});
    }

    async loadData(endpoint, dataTransformer) {
        console.log('calling load data from: ' + endpoint);

       return await fetch(this.props.apiURL + endpoint)
            .then(response => response.json())
            .then((data) => {
                if (data.status === 'SUCCESS') {
                    return dataTransformer(data);
                } else {
                    console.error('endpoint ' + endpoint + ' failed ' + JSON.stringify(data));
                }
            })
            .catch(err => console.error(this.state.url, err.toString()));
    }

    async loadReportsCounter() {
        this.setState({reportsCounter: await this.loadData('/reports/count', (data) => parseInt(data.reports_count))});
    }

    async loadTrashPointDetails(props) {
        const trashPointId = props.location.pathname.substring(props.location.pathname.lastIndexOf('/') + 1);
        this.setState({selectedTrashPoint: await this.loadData('/trashpoint/' + trashPointId, (data) => data.sources[0])});
    }

    async loadCountryDetails(countryCode) {
        let clickedCountry = this.state.allCountries.find(o => o.code.toLowerCase() == countryCode);
        this.setState({selectedCountry: clickedCountry, updatedCountry: clickedCountry});
    }

    async updateTrashpointsData(props) {
        await this.loadTrashPointDetails(props);
        if (this.state.selectedTrashPoint.country_code != null) {
            await this.loadCountriesData();
            if (this.state.selectedCountry == null ||
                this.state.selectedCountry.code !== this.state.selectedTrashPoint.country_code) {
                await this.loadCountryDetails(
                    this.state.selectedTrashPoint.country_code.toLowerCase());
            }
        } else {
            this.setState({selectedCountry: null});
        }
        this.setState({updatedTrashPoint: this.state.selectedTrashPoint, updatedCountry: this.state.selectedCountry});
    }

    async loadCountriesData() {

        if (this.state.countriesDataLoaded) {
            return;
        }

        const allCountries = await this.loadData('/countries', (data) => data.sources.map(key =>
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
            )));

        this.setState({allCountries, topCountries: allCountries.slice(0, 10), countriesDataLoaded: true});
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

    isGetInvolvedRequired(props) {
        return props.location && props.location.pathname.startsWith('/getinvolved');
    }

    isReadMoreRequired(props) {
        return props.location && props.location.pathname.startsWith('/readmore');
    }


    /* eslint-enable */

    async componentWillReceiveProps(nextProps) {
        if (nextProps.location === this.props.location) {
            return false;
        }
        this.state.aboutClassName = 'hidden';
        this.state.downloadClassName = 'hidden';
        this.state.getInvolvedClassName = 'hidden';
        this.state.readMoreClassName = 'hidden';
        if (this.isTrashPointDetailsRequired(nextProps)) {
            await this.updateTrashpointsData(nextProps);
        } else if (this.isCountryDetailsRequired(nextProps)) {
            if (this.state.allCountries == null) {
                await this.loadCountriesData();
            }
            const countryCode = nextProps.location.pathname.substring(nextProps.location.pathname.lastIndexOf('/') + 1);
            this.loadCountryDetails(countryCode);
        } else if (this.isCountryListRequired(nextProps)) {
            this.loadCountriesData();
            this.setState({updatedCountry: null, updatedTrashPoint: null});
        } else if (this.isAboutInfoRequired(nextProps)) {
            this.state.aboutClassName = 'about-shown';
        } else if (this.isDownloadPanelRequired(nextProps)) {
            this.state.downloadClassName = 'about-shown';
        } else if (this.isGetInvolvedRequired(nextProps)) {
            this.state.getInvolvedClassName = 'about-shown';
        } else if (this.isReadMoreRequired(nextProps)) {
            this.state.readMoreClassName = 'about-shown';
        }
        return true;
    }

    cartoClient = new carto.Client({apiKey: this.props.cartoApiKey, username: this.props.cartoUsername});

    render() {
        const LeftPanel = () => (
            <Switch>
                <Route exact path={'/(|about|download|getinvolved|readmore)'} component={IntroText} />
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
                            resources={this.state.resources}
                        />
                        <GetInvolved className={this.state.getInvolvedClassName} />
                        <ReadMore className={this.state.readMoreClassName} />
                        <WorldMap
                            resources={this.state.resources}
                            selectedTrashPoint={this.state.updatedTrashPoint}
                            selectedCountry={this.state.updatedCountry}
                            reportsCounter={this.state.reportsCounter}
                        />
                    </div>
                )}
            </div>
        );
    }
}
export default withRouter(App);
