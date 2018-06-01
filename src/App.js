import 'babel-polyfill';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import carto from 'carto.js';
import States from './States';
import IntroText from './IntroText';
import CountryList from './details/CountryList';
import CountryDetails from './details/CountryDetails';
import WorldMap from './maps/WorldMap';
import AboutProject from './AboutProject';
import Download from './Download';

class App extends Component {
    static propTypes = {
        location: PropTypes.object,
    };

    static get defaultProps() {
        return {
            location: this.location,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            state: States.state.LOADING,
            selectedCountry: {},
            selectedTrashPoint: {},
            aboutClassName: (this.isAboutInfoRequired(props) ? 'about-shown' : 'hidden'),
        };
        // Init Google Analytics
        // ReactGA.initialize('UA-109735778-1');
    }

    /* eslint-disable */
    async componentDidMount() {
        this.setState({nativeMap: this.nativeMap});
        if (this.isTrashPointDetailsRequired(this.props)) {
            await this.loadTrashPointDetails(this.props);
            if (this.state.selectedTrashPoint.country_code != null) {
                await this.loadСountriesData();
                if (this.state.selectedCountry == null ||
                    this.state.selectedCountry.country_code !== this.state.selectedTrashPoint.country_code) {
                    await this.loadCountryDetails(this.state.selectedTrashPoint.country_code.toLowerCase());
                }
            } else {
                this.setState({selectedCountry: null});
            }
            //alert(this.state.selectedTrashPoint.country_Code);
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

        await fetch('https://opendata.wemakesoftware.eu/api/trashpoint/' + trashPointId)
            .then(response => response.json())
            .then((data) => {
                console.log('data loaded' + JSON.stringify(data));

                if (data && data.sources) {

                    this.setState({selectedTrashPoint: data.sources[0]});
                }
            })
            .catch(err => console.error(this.state.url, err.toString()));
    }

    async loadCountryDetails(countryCode) {
        let clickedCountry = this.state.allCountries.find(o => o.country_code.toLowerCase() == countryCode);
        this.setState({selectedCountry: clickedCountry});
    }

    async loadСountriesData() {
        await fetch('https://opendata.wemakesoftware.eu/api/countries')
            .then(response => response.json())
            .then((data) => {
                console.log('countriesdata loaded');
                if (data.status === 'SUCCESS') {
                    const allCountries = [];
                    data.sources.forEach(country => allCountries.push(country));
                    this.setState({allCountries, topCountries: allCountries.slice(0, 10)});
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


    /* eslint-enable */

    async componentWillReceiveProps(nextProps) {
        if (nextProps.location === this.props.location) {
            return false;
        }
        this.state.aboutClassName = 'hidden';
        if (this.isTrashPointDetailsRequired(nextProps)) {
            await this.loadTrashPointDetails(nextProps);
            if (this.state.selectedTrashPoint.country_code != null) {
                await this.loadСountriesData();
                if (this.state.selectedCountry == null ||
                    this.state.selectedCountry.country_code !==
                    this.state.selectedTrashPoint.country_code) {
                    await this.loadCountryDetails(
                        this.state.selectedTrashPoint.country_code.toLowerCase());
                }
            } else {
                this.setState({selectedCountry: null});
            }
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
        }

        return true;
    }

    cartoClient = new carto.Client({apiKey: '7947aa9e7fcdff0f5f8891a5f83b1e6fa6350687', username: 'worldcleanupday'});

    render() {
        const LeftPanel = () => (
            <Switch>
                <Route exact path={'/(|about)'} component={IntroText} />
                <Route exact path={'/download'} component={Download} />
                <Route exact={false} path={'/countries'} render={props => <CountryList allCountries={this.state.allCountries} topCountries={this.state.topCountries} {...props} />} />
                <Route path={'/country/:countryCode'} render={props => <CountryDetails selectedCountry={this.state.selectedCountry} selectedTrashPoint={null} {...props} />} />
                <Route path={'/details/:number'} render={props => <CountryDetails selectedCountry={this.state.selectedCountry} selectedTrashPoint={this.state.selectedTrashPoint} {...props} />} />
            </Switch>
        );

        return (
            <div className="app-wrapper">
                <LeftPanel />
                <AboutProject aboutClassName={this.state.aboutClassName} />
                <WorldMap selectedTrashPoint={this.state.selectedTrashPoint} />
            </div>
        );
    }
}
export default withRouter(App);
