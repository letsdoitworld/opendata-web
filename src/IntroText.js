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
                    In order to fully grasp the trash problem, we require reliable data on how
                     much trash there is in the world - and we understood that there is no such
                      database to collect this kind of data. And so the World Waste Platform was
                       born. We have put together data from eight trash mapping apps, data
                       compiled by Gray’s Lab and we will continue this quest until
                       all the trash is mapped.
                </p>

                <a href="#" className="read_more__link">Read more on World Waste Index</a>


            </div>
        );
    }
}
