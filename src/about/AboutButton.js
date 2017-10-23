import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class AboutButton extends Component {
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
            <a role="button" className="info-button" tabIndex={0} onClick={this.props.onClick}>
                <img alt="Info" src="img/about/info.svg" />
            </a>
        );
    }
}
