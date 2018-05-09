import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class IntroText extends Component {
    render() {
        return (
            <div className="details-container">
                <div className="row tpr">
                    <h3>Intro here</h3>
                    <Link to={'/countries'}>See a country list &raquo; </Link>
                </div>
            </div>
        );
    }
}
