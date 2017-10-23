import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TrashReportIndex extends Component {
    static get propTypes() {
        return {
            index: PropTypes.string,
        };
    }
    static get defaultProps() {
        return {
            index: '',
        };
    }
    render() {
        return (
            <div className="counter">
                <h5 className="left">TPR index</h5>
                <b>{this.props.index}</b>
            </div>
        );
    }
}
