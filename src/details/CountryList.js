import React, {Component} from 'react';
import ReactCountryFlag from 'react-country-flag';
import {countries} from 'country-data';
import '../css/details/Details.css';

export default class CountryList extends Component {
    constructor(props) {
        super(props);
        this.state = {data: [], url: 'https://opendata.wemakesoftware.eu/api/countries'};
    }
    componentWillMount() {
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
            <div className="details-container">
                <div className="row tpr">
                    <a href="#" className="previous">&laquo; Back to intro</a>
                    {this.countryDataSTR ?
                        <table>
                            <tbody>{JSON.parse(this.countryDataSTR).map((item, key) => (
                                <tr key={key}>
                                    <td> <ReactCountryFlag code={item.country_code} svg /></td>
                                    <td>{countries[item.country_code].name}</td>
                                </tr>
                            ))}</tbody>
                        </table> : null}

                </div>
            </div>
        );
    }
}
