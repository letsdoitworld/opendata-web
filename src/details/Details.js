import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Country from '../Country';

export default class Details extends Component {
    static get propTypes() {
        return {
            country: PropTypes.instanceOf(Country),
            trashReportIndex: PropTypes.string,
        };
    }
    static get defaultProps() {
        return {
            country: new Country(),
            trashReportIndex: '0',
            population: '0',
            visible: PropTypes.false,
        };
    }
    get qlikUrl() {
        const urlTemplate = 'https://opendata.letsdoitworld.org/analytics/single/?appid=3d7e26a3-298b-4cb8-aef9-80ec65196542&sheet=6b4948b1-2948-4e81-8ac0-5d4178fbf330&opt=currsel&select=country,';
        return urlTemplate + this.props.country.name;
    }
    render() {
        return (
            <div className="details-container">
                <div className="row tpr">
                    <div className="icon-label-container tpr">
                        <span className="label">Country and coordinates </span>
                        <h1>{this.props.trashReportIndex}</h1>
                        <h1>{this.props.trashReportIndex}</h1>
                    </div>
                </div>
            </div>
        );
    }
}
