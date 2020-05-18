import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import PropTypes from 'prop-types';
import '../css/details/Details.css';
import Navigation from '../Navigation';

export default class CountryList extends Component {
    static propTypes = {
        allCountries: PropTypes.array,
        topCountries: PropTypes.array,
    };

    static get defaultProps() {
        return {
            allCountries: this.allCountries,
            topCountries: this.topCountries,
        };
    }
    constructor(props) {
        super(props);
        this.state = {};
        this.showTop10Countries = this.showTop10Countries.bind(this);
        this.showAllCountries = this.showAllCountries.bind(this);
    }

    componentDidMount() {
        this.state = {data: []};
        this.showTop10Countries();
    }

    showTop10Countries(e) {
        if (e) {
            e.preventDefault();
        }

        this.setState({displayedCountries: this.props.topCountries});
    }
    showAllCountries(e) {
        if (e) {
            e.preventDefault();
        }

        this.setState({displayedCountries: this.props.allCountries});
    }

    isTop10Displayed() {
        return !this.state.displayedCountries || this.state.displayedCountries.length === 10;
    }

    render() {
        return (

            <div className="details-container country-list-container">
                <Navigation />
                <nav className="countries-tabs">
                    <a
                        href="#"
                        className={'countries-tabs__item countries-tabs__link ' + (this.isTop10Displayed.bind(this)() ? 'active' : '')}
                        onClick={this.showTop10Countries}
                    >Top 10 mappers</a>
                    <a
                        href="#"
                        className={'countries-tabs__item countries-tabs__link ' + (!this.isTop10Displayed.bind(this)() ? 'active' : '')}
                        onClick={this.showAllCountries}
                    >All countries</a>
                </nav>

                <div className="countries-list">
                    <div className="countries-list__header">
                        <div className="col">Rk</div>
                        <div className="col">Country</div>
                        <div className="col" title="The number of trash reports per 10,000 people">TPR index</div>
                    </div>
                    {this.state.displayedCountries &&
                     this.state.displayedCountries.map((item, key) => (
                         <div className="countries-list__item" key={key}>
                             <div className="col countries-list__item-pos country__index">{key + 1}</div>
                             <div className="col country__flag">
                                 <ReactCountryFlag code={item.code} svg />
                             </div>
                             <div className="col countries-list__item-name">
                                 <Link to={`/country/${item.code.toLowerCase()}`} >{item.name} </Link>
                             </div>
                             <div className="col country__tpr">{Number(item.tpr).toFixed(2)}</div>
                         </div>
                     ))}

                </div>

            </div>
        );
    }
}
