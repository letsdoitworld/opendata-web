import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TrashPointSize extends Component {
    static propTypes = {
        size: PropTypes.number,
        description: PropTypes.string,
    };

    static get defaultProps() {
        return {
            size: this.size,
            description: this.description,
        };
    }

    render() {
        return (
            <div className={'progress progress__state_' + this.props.size} >
                <div className="progress__icons">
                    <div className="progress__icon progress__icon_hand" />
                    <div className="progress__icon progress__icon_trashbag" />
                    <div className="progress__icon progress__icon_wheelbarrow" />
                    <div className="progress__icon progress__icon_truck" />
                </div>
                <div className="progress__bar" />
                <div className="progress__description"> {this.props.description} </div>
            </div>
        );
    }
}
