import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {countries} from 'country-data';
import Geocode from 'react-geocode';

export default class CountryDetails extends Component {
    static propTypes = {
        selectedCountry: PropTypes.object,
        selectedTrashPoint: PropTypes.object,
    };

    static get defaultProps() {
        return {
            selectedCountry: this.selectedCountry,
            selectedTrashPoint: this.selectedTrashPoint,
        };
    }
    constructor(props) {
        super(props);
        this.state = {allTrashPointsClassName: 'hidden', trashpointDetailClassName: 'hidden', address: {name: '', subName: ''}};
        if (this.props.selectedTrashPoint != null) {
            this.state = {allTrashPointsClassName: 'hidden', trashpointDetailClassName: 'displayed', address: {name: '', subName: ''}};
            this.setTrashSize();
        }
    }

    async componentDidMount() {
        this.setTrashPointAddress();
    }
    async setTrashPointAddress() {
        if (this.props.selectedTrashPoint != null && this.props.selectedTrashPoint.lat != null) {
            const address = await this.getadressFromCoordinates();
            this.setState({address});
        }
    }

    async getadressFromCoordinates() {
        // Get address from latidude & longitude.
        const address = {name: '', subName: ''};
        await Geocode.fromLatLng(this.props.selectedTrashPoint.lat,
            this.props.selectedTrashPoint.long).then(
            (response) => {
                for (let i = 0; i < response.results.length; i++) {
                    if (!response.results[i].formatted_address.startsWith('Unnamed')) {
                        address.name = response.results[i].formatted_address;
                        for (let n = 0; n < response.results[i].address_components.length; n++) {
                            if (!address.name.startsWith(response.results[i]
                                .address_components[n].long_name)) {
                                address.subName = response.results[i]
                                    .address_components[n].long_name;
                                break;
                            }
                        }
                        break;
                    }
                }
            },
            (error) => {
                console.error(error);
            },
        );
        if (address.name === '') {
            address.name = this.props.selectedTrashPoint.admin_area;
            address.subName = this.props.selectedTrashPoint.admin_sub_area;
        }
        return address;
    }
    setTrashSize() {
        if (this.props.selectedTrashPoint.bulky) {
            this.props.selectedTrashPoint.sizeState = 4;
        } else if (this.props.selectedTrashPoint.litter) {
            this.props.selectedTrashPoint.sizeState = 3;
        } else if (this.props.selectedTrashPoint.uncategorized) {
            this.props.selectedTrashPoint.sizeState = 2;
        } else {
            this.props.selectedTrashPoint.sizeState = 1;
        }
    }
    async loadData() {
        const countrycode = this.props.selectedCountry != null ?
            this.props.selectedCountry.country_code.toLowerCase() :
            this.props.selectedTrashPoint.country_code.toLowerCase();
        await fetch('https://opendata.wemakesoftware.eu/api/reportsbyparam?code=' + countrycode)
            .then(response => response.json())
            .then((data) => {
                if (data) {
                    this.setState({trashpointsTotal:
                        data.trashpoints_total,
                    trashpoints: data.trashpoints});
                }
            })
            .catch(err => console.error(this.state.url, err.toString()));
    }
    showDetailedData = async (e) => {
        e.preventDefault();
        if (this.state.allTrashPointsClassName === 'displayed') {
            this.setState({allTrashPointsClassName: 'hidden'});
        } else {
            if (this.state.trashpoints == null) {
                await this.loadData();
            }
            this.setState({trashpointDetailClassName: 'hidden'});
            this.setState({allTrashPointsClassName: 'displayed'});
        }
    }

    render() {
        return (
            <div className="details-container country-container">

                <div className="go-back">
                    <Link to={'/countries'} className="go-back__link">Back to countries list</Link>
                </div>

                <h1 className="h1">{ countries[this.props.selectedCountry.country_code] ? countries[this.props.selectedCountry.country_code].name : ''}</h1>

                <div className="country-data__item">
                    <div>
                        <div className="country-data__title">TPR INDEX</div>
                        <div className="country-data__note">*Trash Point Report index (TPR index) shows the number of trash reports per 10,000 people.</div>
                        <a href="#" className="country-data__link">More on TPR index</a>
                    </div>
                    <div className="country-data__value">{this.props.selectedCountry.tpr}</div>
                </div>

                <div className="country-data__item with-icon">
                    <div className="country-data__icon">
                        <img src="/img/population_icon.svg" alt="Population" />
                    </div>
                    <div className="country-data__title">POPULATION</div>
                    <div className="country-data__value">{this.props.selectedCountry.population}</div>
                </div>

                <div className="country-data__item with-icon">
                    <div className="country-data__icon">
                        <img src="/img/report_icon.svg" alt="Report" />
                    </div>
                    <div className="country-data__title">REPORTS</div>
                    <div className="country-data__value">{this.props.selectedCountry.reports_number}</div>
                </div>


                <a href="#" className="btn-detailed-data" onClick={this.showDetailedData}>
                    <span>Get detailed data</span>
                </a>

                <div className="data-collectors">
                    <h2 className="h2">Data collected by</h2>
                    <ul>
                        {this.props.selectedCountry.resources &&
                        this.props.selectedCountry.resources.map((item, key) => (
                            <li className="data-collectors__item" key={key}>
                                <span className="data-collectors__name">{item.resourceName}</span>
                                <a href="#" className="data-collectors__link">{item.link}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={'country-reports-list ' + this.state.allTrashPointsClassName}>

                    <h2 className="h2 header">All trash points</h2>

                    <div className="reports-list">

                        {this.props.selectedCountry &&
                        this.state.trashpoints &&
                        this.state.trashpoints.map((item, key) => (
                            <div className="reports-list__item status-one" key={key}>
                                <div className="reports-list__title"><Link to={`/details/${item.id}`} >{item.type}</Link></div>
                                <div className="reports-list__address">{item.country}</div>
                            </div>
                        ))}
                    </div>


                </div>
                <div className={'trashpoint-details ' + this.state.trashpointDetailClassName}>
                    {this.props.selectedTrashPoint ? <div>
                        <h2 className="header">{this.state.address.name}</h2>

                        <div className="address">{this.state.address.subName}</div>

                        <div className="google-maps-link">
                            <a href="#" className="google-maps-link__link">See directions in Google maps</a>
                        </div>
                        <div className="note">{this.props.selectedTrashPoint.note}</div>
                        {this.props.selectedTrashPoint.hazardous ?
                            <div className="alert">This point has hazardous amount of trash</div> : null}
                        <div className={'progress progress__state_' + this.props.selectedTrashPoint.sizeState}>
                            <div className="progress__icons">
                                <div className="progress__icon progress__icon_hand" />
                                <div className="progress__icon progress__icon_trashbag" />
                                <div className="progress__icon progress__icon_wheelbarrow" />
                                <div className="progress__icon progress__icon_truck" />
                            </div>
                            <div className="progress__bar" />
                            <div className="progress__description">This trash point is created {new Date(this.props.selectedTrashPoint.created_at).toString()} </div>
                        </div>

                        {this.props.selectedTrashPoint.images ? <div className="gallery">
                            <div className="gallery-images">
                                <a href="#" className="gallery-images__item"><img
                                    src="http://via.placeholder.com/160x100"
                                    alt=""
                                    className="gallery-images__image"
                                /></a>
                                <a href="#" className="gallery-images__item"><img
                                    src="http://via.placeholder.com/160x100"
                                    alt=""
                                    className="gallery-images__image"
                                /></a>
                                <a href="#" className="gallery-images__item"><img
                                    src="http://via.placeholder.com/160x100"
                                    alt=""
                                    className="gallery-images__image"
                                /></a>
                                <a href="#" className="gallery-images__item"><img
                                    src="http://via.placeholder.com/160x100"
                                    alt=""
                                    className="gallery-images__image"
                                /></a>
                                <a href="#" className="gallery-images__item"><img
                                    src="http://via.placeholder.com/160x100"
                                    alt=""
                                    className="gallery-images__image"
                                /></a>
                                <a href="#" className="gallery-images__item"><img
                                    src="http://via.placeholder.com/160x100"
                                    alt=""
                                    className="gallery-images__image"
                                /></a>
                                <a href="#" className="gallery-images__item"><img
                                    src="http://via.placeholder.com/160x100"
                                    alt=""
                                    className="gallery-images__image"
                                /></a>
                                <a href="#" className="gallery-images__item"><img
                                    src="http://via.placeholder.com/160x100"
                                    alt=""
                                    className="gallery-images__image"
                                /></a>
                                <a href="#" className="gallery-images__item"><img
                                    src="http://via.placeholder.com/160x100"
                                    alt=""
                                    className="gallery-images__image"
                                /></a>
                            </div>
                        </div> : null}

                        <div className="detailed-info">
                            <h3 className="h2">Trash origin</h3>
                            {this.props.selectedTrashPoint.household ?
                                <div className="description">Household</div> : null}

                            {this.props.selectedTrashPoint.construction ?
                                <div className="description">Construction</div> : null}
                            <h3 className="h2">Trash type</h3>

                            <ul className="details">
                                {this.props.selectedTrashPoint.glass ?
                                    <li className="details__item">Glass</li>
                                    : null}
                                {this.props.selectedTrashPoint.lumber ?
                                    <li className="details__item">Lumber</li>
                                    : null}
                                {this.props.selectedTrashPoint.plastic ?
                                    <li className="details__item">Plastic</li>
                                    : null}
                                {this.props.selectedTrashPoint.metal ?
                                    <li className="details__item">Metal</li>
                                    : null}
                                {this.props.selectedTrashPoint.rubber ?
                                    <li className="details__item">Rubber</li>
                                    : null}
                                {this.props.selectedTrashPoint.other ?
                                    <li className="details__item">Other</li>
                                    : null}
                                {this.props.selectedTrashPoint.textile ?
                                    <li className="details__item">Textile</li>
                                    : null}
                            </ul>
                        </div>
                    </div> : null}
                </div>
            </div>
        );
    }
}
