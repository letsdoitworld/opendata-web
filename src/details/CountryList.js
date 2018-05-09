import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import {countries} from 'country-data';
import '../css/details/Details.css';

export default class CountryList extends Component {
    constructor(props) {
        super(props);
        this.state = {data: [], url: 'https://opendata.wemakesoftware.eu/api/countries'};
        this.loadData();
    }
    loadData() {
        fetch(this.state.url)
            .then(response => response.json())
            .then((data) => {
                this.setState({data});
            })
            .catch(err => console.error(this.state.url, err.toString()));
    }
    render() {
        this.countryDataSTR = JSON.stringify(this.state.data.sources);

        return (
            <div className="country-list">
                <Link to={'/'}>Back to intro&raquo; </Link>
                <h3>Country list</h3>
                {this.countryDataSTR ?
                    <table>
                        <tbody>{JSON.parse(this.countryDataSTR).map((item, key) => (
                            <tr key={key}>
                                <td> <ReactCountryFlag code={item.country_code} svg /></td>
                                <td> <Link to={`/country/${item.country_code}`} > {countries[item.country_code].name} </Link> </td>
                                <td>{item.tpr}</td>
                            </tr>
                        ))}</tbody>
                    </table> : null}
            </div>
        );
    }
}
