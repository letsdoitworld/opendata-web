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
                <Link to={'/'}>
                    <img src="img/logo.png" className="logo__image" alt="Logo" />
                </Link>
                <div className="nav__item">
                    <Link
                        to={'/'}
                        className={'nav__link ' + (Object.is(this.props.location.pathname, '/') ? 'active' : 'inactive')}
                    >
                        Home
                    </Link>
                </div>
                <div className="nav__item">
                    <Link
                        to={'/ai'}
                        className={'nav__link ' + (this.props.location.pathname.startsWith('/ai') ? 'active' : 'inactive')}
                    >
                        AI Trash Detection
                    </Link>
                </div>
                <div className="nav__item">
                    <Link
                        to={'/about'}
                        className={'nav__link ' + (this.props.location.pathname.startsWith('/about') ? 'active' : 'inactive')}
                    >
                        About the World Waste Platform
                    </Link>
                </div>
                <div className="nav__item">
                    <Link
                        to={'/download'}
                        className={'nav__link ' + (this.props.location.pathname.startsWith('/download') ? 'active' : 'inactive')}
                    >
                        Download Data
                    </Link>
                </div>
                <div className="nav__item">
                    <Link
                        to={'/getinvolved'}
                        className={'nav__link ' + (this.props.location.pathname.startsWith('/getinvolved') ? 'active' : 'inactive')}
                    >
                        How to Get Involved?
                    </Link>
                </div>
                <div className="nav__item">
                    <Link
                        to={'/readmore'}
                        className={'nav__link ' + (this.props.location.pathname.startsWith('/readmore') ? 'active' : 'inactive')}
                    >
                        World Waste Index
                    </Link>
                </div>
                <div className="nav__item">
                    <Link
                        to={'/countries'}
                        className={'nav__link ' + (this.props.location.pathname.startsWith('/countries') ? 'active' : 'inactive')}
                    >
                        Country List
                    </Link>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navigation);
