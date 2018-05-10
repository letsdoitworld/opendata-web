import React, {Component} from 'react';

export default class Navigation extends Component {
    render() {
        return (
            <nav className="nav">
                <a href="#" className="nav__item nav__link">About the project</a>
                <a href="#" className="nav__item nav__link">Download data </a>
                <a href="#" className="nav__item nav__link">How to get involved</a>
            </nav>
        );
    }
}
