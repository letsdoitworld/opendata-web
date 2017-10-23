import React, {Component} from 'react';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';

export default class DateControl extends Component {
    static get propTypes() {
        return {
            date: PropTypes.instanceOf(Date),
        };
    }
    static get defaultProps() {
        return {
            date: new Date(),
        };
    }
    render() {
        return (
            <div className="counter">
                <h5 className="left">Date</h5>
                <b>{dateformat(this.props.date, 'yyyy mmm')}</b>
            </div>
        );
    }
}
