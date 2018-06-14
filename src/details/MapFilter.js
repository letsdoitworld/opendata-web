import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/details/Details.css';


export default class MapFilter extends Component {
    static propTypes = {
        srcFromFilter: PropTypes.func.isRequired,
        apiURL: PropTypes.string,
    };

    static get defaultProps() {
        return {
            apiURL: this.apiURL,
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            value: 'select',
            resourceFilter: [],
            statusFilterShown: false,
            resourceFilterShown: false,
            statusFilter: [
                {code: 'CLEANED', label: 'Clean', selected: false},
                {code: 'REPORTED', label: 'Unclean', selected: false},
                {code: 'hazardous', label: 'Hazardous', selected: false},
            ],
        };
        this.selectFilterValue = this.selectFilterValue.bind(this);
    }
    async componentDidMount() {
        if (this.state.resourceFilter.length === 0) {
            await this.loadResourcesData();
        }
    }

    async loadResourcesData() {
        await fetch(this.props.apiURL + '/resources')
            .then(response => response.json())
            .then((data) => {
                console.log('resources loaded');
                if (data.status === 'SUCCESS') {
                    this.setState({resourceFilter: data.sources});
                }
            })
            .catch(err => console.error(this.state.url, err.toString()));
    }
    composeFilterQuery(filterparams) {
        let q = 'select * from opendata_public_reports where';
        for (let i = 0; filterparams.length > i; i++) {
            q += (i === 0 ? ' (' : ' and (');
            for (let j = 0; filterparams[i].values.length > j; j++) {
                q = q + (j === 0 ? ' ' : ' or ') + filterparams[i].name + "='" + filterparams[i].values[j] + "'";
            }
            q += ')';
        }

        this.props.srcFromFilter(q);
    }
    change(event) {
        const filterParams = [
            {name: 'status', values: ['CLEANED', 'CONFIRMED']},
            {name: 'type', values: ['Trashout', 'WorldCleanupDay']},
        ];
        this.setState({value: event.target.value});
        // this.props.srcFromFilter("select * from opendata_public_reports where country_code='"+this.state.value+"'");
        this.props.srcFromFilter(this.composeFilterQuery(filterParams));
    }
    selectFilterValue(filterName, itemKey, paramName) {
        const selectedFilter = this.state[filterName];
        if (selectedFilter[itemKey].selected) {
            selectedFilter[itemKey].selected = false;
        } else {
            selectedFilter[itemKey].selected = true;
        }
        this.setState({filterName: selectedFilter});
        const filterParams = [];
        for (let i = 0; selectedFilter.length > i; i++) {
            let found = false;
            if (selectedFilter[i].selected) {
                for (let j = 0; filterParams.length > j; j++) {
                    if (filterParams[j].name === paramName) {
                        filterParams[j].values.push(selectedFilter[i].code);
                        found = true;
                    }
                }
                if (!found) {
                    const newParam = {name: paramName, values: [selectedFilter[i].code]};
                    filterParams.push(newParam);
                }
            }
        }
        this.composeFilterQuery(filterParams);
    }

    showHideFilter(filterName) {
        const newState = {};
        newState[filterName] = !this.state[filterName];
        this.setState(newState);
    }
    render() {
        return (
            <div className="map-container">

                <div className="onmap-filter">
                    <div className="onmap-filter__title h2">Filter by</div>
                    <div className="onmap-filter__filters">
                        <div className="onmap-filter__item">


                            <div className="filter">
                                <div className="select-container">
                                    <div
                                        role="none"
                                        className="selection"
                                        onClick={() => this.showHideFilter('statusFilterShown')}
                                    >
                                        Trashpoint
                                    </div>


                                    {this.state.statusFilterShown && (
                                        <div className="select-options">
                                            {this.state.statusFilter.map((item, key) => (
                                                <div
                                                    role="none"
                                                    className={'select-options__item' +
                                                    (this.state.statusFilter[key].selected ? ' selected' : '')}
                                                    key={this.state.statusFilter[key].code + '__' + item}
                                                    onClick={() => this.selectFilterValue('statusFilter', key, 'status')}
                                                >
                                                    {this.state.statusFilter[key].label}
                                                    <span className="radiobtn" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                        <div className="onmap-filter__item">

                            <div className="filter">
                                <div className="select-container">
                                    <div
                                        role="none"
                                        className="selection"
                                        onClick={() => this.showHideFilter('resourceFilterShown')}
                                    >
                                        App
                                    </div>
                                    {this.state.resourceFilterShown && (
                                        <div className="select-options">
                                            {this.state.resourceFilter.map((key, value) => (
                                                <div
                                                    role="none"
                                                    className="select-options__item"
                                                    key={this.state.resourceFilter[value].name + '__' + value}
                                                    onClick={() => this.selectFilterValue('resourceFilter', key)}
                                                >
                                                    {this.state.resourceFilter[value].name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                        <div className="onmap-filter__item">

                            <div className="share-widget">
                                <div className="share-widget__title">Share</div>
                                <div className="share-widget__options">
                                    <a href="#" className="share-widget__item link">Copy link</a>
                                    <a href="#" className="share-widget__item facebook">Facebook</a>
                                    <a href="#" className="share-widget__item twitter">Twitter</a>
                                    <a href="#" className="share-widget__item messenger">Messenger</a>
                                </div>
                            </div>

                        </div>
                        <div className="onmap-filter__item" />
                    </div>
                </div>

            </div>
        );
    }
}
