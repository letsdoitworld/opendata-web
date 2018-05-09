import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../css/details/Details.css';

export default class CountryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="details-container">
                <Link to={'/countries'}>Back to countries list &raquo; </Link>
                <div className="row tpr">
                    country details here
                </div>
            </div>
        );
    }
}
