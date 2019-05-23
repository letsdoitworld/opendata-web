import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import FacebookShareWrapper from './utils/FacebookShareWrapper';
import Navigation from './Navigation';

class IntroText extends Component {
    static propTypes = {
        location: PropTypes.object,
    };

    static get defaultProps() {
        return {
            location: this.location,
        };
    }


    render() {
        const isInfoShown = () => this.props.location &&
                (
                    this.props.location.pathname.startsWith('/getinvolved') ||
                    this.props.location.pathname.startsWith('/download') ||
                    this.props.location.pathname.startsWith('/about')
                );

        return (

            <div className="details-container">

                {
                    isInfoShown() && (
                    <div className="go-back">
                        <Link to={'/'} className="go-back__link">Back</Link>
                    </div>)
                }
                {
                    !isInfoShown() && (
                    <div className="open-country-list">
                        <Link to={'/countries'} className="open-country-list__link">See a country list</Link>
                    </div>)
                }

                <Navigation />

                <FacebookShareWrapper />

                <img src="img/logo.png" className="logo__image" alt="Logo" />

                <p className="intro">A world without waste is our dream.</p>
                <p>
                    In order to fully grasp the trash problem, we require reliable data on how much trash there is in the world - and we understood that there is no such database to collect this kind of data. And so the World Waste Platform was born. The map is currently showing data from 8 mapping apps compiled by Gray’s Lab.
                </p>

                <Link to={'/readmore'} className="read_more__link">Read more on World Waste Index</Link>

            </div>
        );
    }
}

export default withRouter(IntroText);
