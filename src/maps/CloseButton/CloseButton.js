import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CloseButton extends Component {
    static get propTypes() {
        return {
            onClick: PropTypes.func,
        };
    }
    static get defaultProps() {
        return {
            onClick: () => {},
        };
    }
    render() {
        return (
            <button type="button" className="x" onClick={this.props.onClick} />
        );
    }
}
