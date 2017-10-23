import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Counter extends Component {
    static get propTypes() {
        return {
            numberOfReports: PropTypes.string,
        };
    }
    static get defaultProps() {
        return {
            numberOfReports: '0',
        };
    }
    render() {
        return (
            <div className="counter">
                <h5 className="right">Reports</h5>
                <b>{this.props.numberOfReports}</b>
            </div>
        );
    }
}
