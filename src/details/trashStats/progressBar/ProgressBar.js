import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ProgressBar extends Component {
    static get propTypes() {
        return {
            percent: PropTypes.number,
            type: PropTypes.String,
        };
    }
    static get defaultProps() {
        return {
            percent: 0,
            type: '',
        };
    }
    render() {
        const {percent, type} = this.props;
        return (
            <div className={'bar ' + type}>
                <div className="progress" style={{width: (100 - percent) + '%'}} />
            </div>
        );
    }
}
