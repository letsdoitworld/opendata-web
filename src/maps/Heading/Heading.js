import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Headig extends Component {
    static get propTypes() {
        return {
            text: PropTypes.string,
        };
    }
    static get defaultProps() {
        return {
            text: '',
        };
    }
    render() {
        return (
            <h1 className="heading">{this.props.text}</h1>
        );
    }
}
