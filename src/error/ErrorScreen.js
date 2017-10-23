import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ErrorScreen extends Component {
    static get propTypes() {
        return {
            onProceed: PropTypes.func,
        };
    }
    static get defaultProps() {
        return {
            onProceed: () => { window.location.reload(); },
        };
    }
    render() {
        return (
            <div className="error-screen">
                <h1>Oops! Something went wrong</h1>
                <button type="button" onClick={this.props.onProceed}>Refresh</button>
            </div>
        );
    }
}
