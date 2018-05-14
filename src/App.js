import 'babel-polyfill';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import carto from 'carto.js';
import States from './States';
import IntroText from './IntroText';
import Details from './details/Details';
import CountryList from './details/CountryList';
import CountryDetails from './details/CountryDetails';
import WorldMap from './maps/WorldMap';

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
        };

        // Init Google Analytics
        // ReactGA.initialize('UA-109735778-1');
    }

    /* eslint-disable */
    componentDidMount() {
        this.setState({nativeMap: this.nativeMap});

        if (this.isTrashPointDetailsRequired(this.props)) {
            this.loadTrashPointDetails(this.props);
        } else if (this.isCountryDetailsRequired(this.props)) {
            this.loadCountryDetails(this.props);
        }
    }

    loadTrashPointDetails(props) {
        const trashPointId = props.location.pathname.substring(props.location.pathname.lastIndexOf('/') + 1);
        console.log('loading trashpoint with id: ' + trashPointId);

        fetch('https://opendata.wemakesoftware.eu/api/trashpoint/' + trashPointId)
            .then(response => response.json())
            .then((data) => {
                console.log('data loaded' + JSON.stringify(data));

                if (data && data.sources) {

                    this.setState({selectedTrashPoint: data.sources[0]});
                }
            })
            .catch(err => console.error(this.state.url, err.toString()));
    }

    loadCountryDetails(props) {
        const countryCode = props.location.pathname.substring(props.location.pathname.lastIndexOf('/') + 1);
        console.log('loading countrywith id: ' + countryCode);

        fetch('https://opendata.wemakesoftware.eu/api/reportsbyparam?country_code=' + countryCode)
            .then(response => response.json())
            .then((data) => {

                    console.log('data loaded' + JSON.stringify(data));
                if (data) {
                    this.setState({selectedCountry: {'countryCode': countryCode.toUpperCase(), trashPointsTotal: data.trashpoints_total, trashPoints:  data.trashpoints}});
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

    /* eslint-enable */

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            console.log('componentWillReceiveProps');
            if (this.isTrashPointDetailsRequired(nextProps)) {
                this.loadTrashPointDetails(nextProps);
            } else if (this.isCountryDetailsRequired(nextProps)) {
                this.loadCountryDetails(nextProps);
            }
        }
    }

    cartoClient = new carto.Client({apiKey: '7947aa9e7fcdff0f5f8891a5f83b1e6fa6350687', username: 'worldcleanupday'});

    render() {
        const LeftPanel = () => (
            <Switch>
                <Route exact path={'/'} component={IntroText} />
                <Route exact={false} path={'/countries'} component={CountryList} />
                <Route path={'/country/:countryCode'} render={props => <CountryDetails selectedCountry={this.state.selectedCountry} {...props} />} />
                <Route path={'/details/:number'} render={props => <Details selectedTrashPoint={this.state.selectedTrashPoint} {...props} />} />
            </Switch>
        );

        return (
            <div className="app-wrapper">
                <LeftPanel />
                <WorldMap selectedTrashPoint={this.state.selectedTrashPoint} />
            </div>
        );
    }
}
export default withRouter(App);
