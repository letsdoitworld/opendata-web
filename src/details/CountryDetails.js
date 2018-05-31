import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {countries} from 'country-data';
import IntroText from '../IntroText';

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
        this.state = {allTrashPointsClassName: 'hidden', trashpointDetailClassName: 'hidden'};
        if (this.props.selectedTrashPoint != null) {
            this.state = {allTrashPointsClassName: 'hidden', trashpointDetailClassName: 'displayed'};
            this.setTrashSize();
        }
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
    getTrashStatus() {
        for (let i = 0; i < this.state.trashpoints.length; i++) {
            if (this.state.trashpoints[i].hazardous) {
                this.state.trashpoints[i].trashViewStatus = 'two';
            } else if (this.state.trashpoints[i].status === 'CLEANED') {
                this.state.trashpoints[i].trashViewStatus = 'three';
            } else {
                this.state.trashpoints[i].trashViewStatus = 'one';
            }
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
                this.getTrashStatus();
            }
            this.setState({trashpointDetailClassName: 'hidden'});
            this.setState({allTrashPointsClassName: 'displayed'});
        }
    }

    render() {
        return (
            <div className={this.props.selectedCountry ? 'details-container country-container-' : ''}>
                {this.props.selectedCountry ?
                    <div className="country-details">
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
                            <div className="country-data__value">{Number(this.props.selectedCountry.tpr).toFixed(2)}</div>
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

                        {this.props.selectedCountry.reports_number > 0 ?
                            <a href="#" className="btn-detailed-data" onClick={this.showDetailedData}>
                                <span>Get detailed data</span>
                            </a> : null}
                        {this.props.selectedCountry.resources &&
                        this.props.selectedCountry.resources.length > 0 ?
                            <div className="data-collectors">
                                <h2 className="h2">Data collected by</h2>
                                <ul>
                                    {this.props.selectedCountry.resources.map((item, key) => (
                                        <li className="data-collectors__item" key={key}>
                                            <span className="data-collectors__name">{item.resourceName}</span>
                                            <a href={item.link} className="data-collectors__link">{item.link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div> : null}

                        <div className={'country-reports-list ' + this.state.allTrashPointsClassName}>

                            <h2 className="h2 header">All trash points</h2>

                            <div className="reports-list">

                                {this.props.selectedCountry &&
                        this.state.trashpoints &&
                        this.state.trashpoints.map((item, key) => (
                            <div className={'reports-list__item status-' + item.trashViewStatus} key={key}>
                                <div className="reports-list__title"><Link to={`/details/${item.id}`} >{item.admin_area}</Link></div>
                                <div className="reports-list__address">{item.admin_sub_area}</div>
                            </div>
                        ))}
                            </div>
                        </div>

                    </div> : <IntroText />}
                <div className={'trashpoint-details ' + this.state.trashpointDetailClassName}>
                    {this.props.selectedTrashPoint ? <div>
                        <h2 className="header">{this.props.selectedTrashPoint.admin_area}</h2>
                        <div className="address">
                            <div className="address__value">{this.props.selectedTrashPoint.admin_sub_area}</div>
                        </div>
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
                            {this.props.selectedTrashPoint.household ?
                                <div>
                                    <h3 className="h2">Trash origin</h3>
                                    <div className="description">Household</div></div> : null}

                            {this.props.selectedTrashPoint.construction ?
                                <div className="description">Construction</div> : null}
                            { this.props.selectedTrashPoint.glass ||
                            this.props.selectedTrashPoint.lumber ||
                            this.props.selectedTrashPoint.metal ||
                            this.props.selectedTrashPoint.plastic ||
                            this.props.selectedTrashPoint.rubber ||
                            this.props.selectedTrashPoint.other ||
                            this.props.selectedTrashPoint.textile ? <div>
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
                                </ul></div> : null}
                        </div>
                    </div> : null}
                </div>
            </div>
        );
    }
}
