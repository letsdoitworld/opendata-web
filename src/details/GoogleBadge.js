import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class GoogleBadge extends Component {
    static get propTypes() {
        return {
            url: PropTypes.string,
        };
    }
    static get defaultProps() {
        return {
            url: '',
        };
    }
    render() {
        return (
            <a className="badge" target="_blank" rel="noreferrer noopener" href={this.props.url}>
                <img
                    alt="Get it on Google Play"
                    src="img/badges/googleplay.svg"
                />
            </a>
        );
    }
}
