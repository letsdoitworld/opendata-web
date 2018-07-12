import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';

class Navigation extends Component {
    static propTypes = {
        location: PropTypes.object,
    };

    static get defaultProps() {
        return {
            location: this.location,
        };
    }

    render() {
        return (
            <nav className="nav">
                <Link to={'/about'} className={'nav__item nav__link ' + (this.props.location.pathname.startsWith('/about') && 'active')}>
                    About the project
                </Link>
                <Link
                    to={'/download'}
                    className={'nav__item nav__link ' + (this.props.location.pathname.startsWith('/download') && 'active')}
                >
                    Download data
                </Link>
                <Link
                    to={'/getinvolved'}
                    className={'nav__item nav__link ' + (this.props.location.pathname.startsWith('/getinvolved') && 'active')}
                >
                    How to get involved
                </Link>
            </nav>
        );
    }
}

export default withRouter(Navigation);
