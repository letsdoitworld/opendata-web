import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/details/Details.css';

export default class CountryDetails extends Component {
    static propTypes = {
        match: PropTypes.object,
    };

    static get defaultProps() {
        return {
            match: this.match,
        };
    }
    constructor(props) {
        super(props);
        this.state = {data: [], url: 'https://opendata.wemakesoftware.eu/api/reportsbycountry/' + this.props.match.params.countryCode};
        this.loadData();
    }
    loadData() {
        fetch(this.state.url)
            .then(response => response.json())
            .then((data) => {
                this.setState({data});
            })
            .catch(err => console.error(this.state.url, err.toString()));
    }
    render() {
        this.countryDataSTR = JSON.stringify(this.state.data.sources);
        return (
            <div className="details-container">
                <Link to={'/countries'}>Back to countries list &raquo; </Link>
                <div className="row tpr">
                    country details here
                    {this.countryDataSTR}
                </div>
            </div>
        );
    }
}
