import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {countries} from 'country-data';

export default class CountryDetails extends Component {
    static propTypes = {
        selectedCountry: PropTypes.object,
    };

    static get defaultProps() {
        return {
            selectedCountry: this.selectedCountry,
        };
    }
    constructor(props) {
        super(props);
        this.state = {allTrashPointsClassName: 'hidden'};
        this.setState({allTrashPointsClassName: 'hidden'});
    }

    showDetailedData = (e) => {
        e.preventDefault();
        if (this.state.allTrashPointsClassName === 'displayed') {
            this.setState({allTrashPointsClassName: 'hidden'});
        } else {
            this.setState({allTrashPointsClassName: 'displayed'});
        }
    }

    render() {
        return (
            <div className="details-container country-container">

                <div className="go-back">
                    <Link to={'/countries'} className="go-back__link">Back to countries list</Link>
                </div>

                <h1 className="h1">{ countries[this.props.selectedCountry.countryCode] ? countries[this.props.selectedCountry.countryCode].name : ''}</h1>

                <div className="country-data__item">
                    <div>
                        <div className="country-data__title">TPR INDEX</div>
                        <div className="country-data__note">*Trash Point Report index (TPR index) shows the number of trash reports per 10,000 people.</div>
                        <a href="#" className="country-data__link">More on TPR index</a>
                    </div>
                    <div className="country-data__value">0,06</div>
                </div>

                <div className="country-data__item with-icon">
                    <div className="country-data__icon">
                        <img src="/img/population_icon.svg" alt="Population" />
                    </div>
                    <div className="country-data__title">POPULATION</div>
                    <div className="country-data__value">11,46M</div>
                </div>

                <div className="country-data__item with-icon">
                    <div className="country-data__icon">
                        <img src="/img/report_icon.svg" alt="Report" />
                    </div>
                    <div className="country-data__title">REPORTS</div>
                    <div className="country-data__value">64M</div>
                </div>


                <a href="#" className="btn-detailed-data" onClick={this.showDetailedData}>
                    <span>Get detailed data</span>
                </a>

                <div className="data-collectors">
                    <h2 className="h2">Data collected by</h2>

                    <ul>
                        <li className="data-collectors__item">
                            <span className="data-collectors__name">Marine Debris Tracker</span>
                            <a href="#" className="data-collectors__link">marinedebris.engr.uga.edu</a>
                        </li>
                        <li className="data-collectors__item">
                            <span className="data-collectors__name">Marine LitterWatch</span>
                            <a href="#" className="data-collectors__link">eea.europa.eu</a>
                        </li>
                        <li className="data-collectors__item">
                            <span className="data-collectors__name">Ocean Conservancy</span>
                            <a href="#" className="data-collectors__link">oceanconservancy.org</a>
                        </li>
                        <li className="data-collectors__item">
                            <span className="data-collectors__name">TrashOut</span>
                            <a href="#" className="data-collectors__link">trashout.ngo</a>
                        </li>
                    </ul>
                </div>

                <div className={'country-reports-list ' + this.state.allTrashPointsClassName}>

                    <h2 className="h2 header">All trash points</h2>

                    <div className="reports-list">

                        {this.props.selectedCountry &&
                        this.props.selectedCountry.trashPoints &&
                        this.props.selectedCountry.trashPoints.map(item => (
                            <div className="reports-list__item status-one">
                                <div className="reports-list__title">{item.type}</div>
                                <div className="reports-list__address">{item.country}</div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        );
    }
}
