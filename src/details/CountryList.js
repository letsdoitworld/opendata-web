import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import ReactCountryFlag from 'react-country-flag';
import {countries} from 'country-data';
import '../css/details/Details.css';
import Navigation from '../Navigation';

export default class CountryList extends Component {
    constructor(props) {
        super(props);
        // this.loadData();
        this.state = {};
        this.showTop10Countries = this.showTop10Countries.bind(this);
        this.showAllCountries = this.showAllCountries.bind(this);
    }

    componentDidMount() {
        this.state = {data: [], url: 'https://opendata.wemakesoftware.eu/api/countries'};
        this.loadData();
    }

    loadData() {
        fetch(this.state.url)
            .then(response => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status === 'SUCCESS') {
                    const allCountries = [];
                    data.sources.forEach(country => allCountries.push(country));
                    this.setState({allCountries, topCountries: allCountries.slice(0, 10)});
                    this.showTop10Countries();
                }
            })
            .catch(err => console.error(this.state.url, err.toString()));
    }

    showTop10Countries(e) {
        if (e) {
            e.preventDefault();
        }

        this.setState({displayedCountries: this.state.topCountries});
    }
    showAllCountries(e) {
        if (e) {
            e.preventDefault();
        }

        this.setState({displayedCountries: this.state.allCountries});
    }

    isTop10Displayed() {
        return !this.state.displayedCountries || this.state.displayedCountries.length === 10;
    }

    render() {
        return (

            <div className="details-container county-list-container">

                <div className="go-back">
                    <Link to={'/'} className="go-back__link">Back to intro</Link>
                </div>
                <Navigation />

                <div className="search-box">
                    <input type="text" className="search-box__field" />
                    <button type="button" className="search-box__button"><span /></button>
                </div>

                <nav className="countries-tabs">
                    <a href="#" className={'countries-tabs__item countries-tabs__link ' + (this.isTop10Displayed.bind(this)() ? 'active' : '')} onClick={this.showTop10Countries}>Top 10 mappers</a>
                    <a href="#" className={'countries-tabs__item countries-tabs__link ' + (!this.isTop10Displayed.bind(this)() ? 'active' : '')} onClick={this.showAllCountries}>All countries</a>
                </nav>

                <div className="countries-list">
                    <div className="countries-list__header">
                        <div className="col">Rk</div>
                        <div className="col">Country</div>
                        <div className="col">TPR index</div>
                    </div>
                    {this.state.displayedCountries &&
                     this.state.displayedCountries.map((item, key) => (
                         <div className="countries-list__item">
                             <div className="col">{key + 1}</div>
                             <div className="col">
                                 <Link to={`/country/${item.country_code.toLowerCase()}`} >{countries[item.country_code].name} </Link>
                             </div>
                             <div className="col">{Number(item.tpr).toFixed(2)}</div>
                         </div>
                     ))}

                </div>

            </div>
        );
    }
}
