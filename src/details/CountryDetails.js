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
        this.state = {allTrashPointsClassName: 'hidden', trashpointDetailClassName: 'hidden', address: ''};
        if (this.props.selectedTrashPoint != null) {
            this.state = {allTrashPointsClassName: 'hidden', trashpointDetailClassName: 'displayed', address: ''};
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
        let address;
        // Get address from latidude & longitude.
        await Geocode.fromLatLng(this.props.selectedTrashPoint.lat,
            this.props.selectedTrashPoint.long).then(
            (response) => {
                address = response.results[0].formatted_address;
            },
            (error) => {
                console.error(error);
            },
        );
        return address;
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
                        this.state.trashpoints.map(item => (
                            <div className="reports-list__item status-one">
                                <div className="reports-list__title"><Link to={`/details/${item.id}`} >{item.type}</Link></div>
                                <div className="reports-list__address">{item.country}</div>
                            </div>
                        ))}
                    </div>


                </div>
                <div className={'trashpoint-details ' + this.state.trashpointDetailClassName}>
                    {this.props.selectedTrashPoint ? <div>
                        <h2 className="header">{this.state.address}</h2>

                        <div className="address">10415, Vana-Kalamaja, Põhja-Tallinn</div>

                        <div className="google-maps-link">
                            <a href="#" className="google-maps-link__link">See directions in Google maps</a>
                        </div>

                        <div className="note">
                            <strong>Note:</strong>
                        This point is located just around the corner
                            of Kalamaja bakery near kids’ playground. It is in
                        a visible place and hurts everyone’s eye.
                        </div>

                        <div className="alert">This point has hazardous amount of trash</div>

                        <div className="progress progress__state_1">
                            <div className="progress__icons">
                                <div className="progress__icon progress__icon_hand" />
                                <div className="progress__icon progress__icon_trashbag" />
                                <div className="progress__icon progress__icon_wheelbarrow" />
                                <div className="progress__icon progress__icon_truck" />
                            </div>
                            <div className="progress__bar" />
                            <div className="progress__description">There is ca 33 bags of trash in this point</div>
                        </div>

                        <div className="gallery">
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
                        </div>

                        <div className="detailed-info">
                            <h3 className="h2">Trash origin</h3>
                            <div className="description">Household</div>

                            <h3 className="h2">Trash type</h3>

                            <ul className="details">
                                <li className="details__item">Glass</li>
                                <li className="details__item">Bottles</li>
                                <li className="details__item">Plastic</li>
                                <li className="details__item">Packages</li>
                                <li className="details__item">Glass</li>
                                <li className="details__item">Bottles</li>
                                <li className="details__item">Plastic</li>
                                <li className="details__item">Packages</li>
                                <li className="details__item">Glass</li>
                                <li className="details__item">Bottles</li>
                                <li className="details__item">Plastic</li>
                                <li className="details__item">Packages</li>
                            </ul>
                        </div>
                    </div> : null}
                </div>
            </div>
        );
    }
}
