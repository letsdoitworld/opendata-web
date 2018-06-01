import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';

export default class IntroText extends Component {
    render() {
        return (

            <div className="details-container">

                <div className="open-country-list">
                    <Link to={'/countries'} className="open-country-list__link">See a country list</Link>
                </div>

                <Navigation />

                <nav className="lang-switcher">
                    <a href="#" className="lang-switcher__link">
                        <span className="lang-switcher__flag" />Est</a>
                </nav>

                <img src="img/logo.png" className="logo__image" alt="Logo" />

                <p className="intro">A world without waste is our dream.</p>
                <p>

                    <a href="https://opendata.wemakesoftware.eu/api/reportsbyparam?country_code=EE&amp;download=true">
                        Download data for Estonia
                    </a>
                </p>

                <a href="#" className="read_more__link">Read more on World Waste Index</a>


            </div>
        );
    }
}
