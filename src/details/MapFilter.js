import lodash from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/details/Details.css';
import TrashPointDateFilter from '../TrashPointDateFilter';


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
            startDate: null,
            endDate: null,
            filters: [],
            statusFilterShown: false,
            resourceFilterShown: false,
            statusFilter: [
                {name: 'CLEANED', label: 'Clean', selected: false},
                {name: 'REPORTED', label: 'Unclean', selected: false},
                {name: 'hazardous', label: 'Hazardous', selected: false},
            ],
        };
        this.selectFilterValue = this.selectFilterValue.bind(this);
        this.selectFilterDates = this.selectFilterDates.bind(this);
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

    composeFilterQuery() {
        let q = 'select * from opendata_public_reports';

        const queryParams = [];

        lodash(this.state.filters)
            .filter(filter => filter.source)
            .forEach((filter) => {
                // collect selected filters into string
                const items = lodash(filter.source)
                    .filter(source => source.selected && source.name !== 'hazardous')
                    .map(source => filter.paramname + "'" + source.name + "'")
                    .join(' or ');

                if (items) {
                    queryParams.push('(' + items + ')');
                }
                // hazardous has to have special treatment as it is not a status
                // but a separate property inside the database
                if (lodash(filter.source).some(source => source.selected && source.name === 'hazardous')) {
                    queryParams.push('(hazardous = true)');
                }
            });

        if (queryParams.length > 0) {
            q += ' where ( ' + queryParams.join(' and ') + ' )';
        }
        console.log(q);
        this.props.srcFromFilter(q);
    }

    selectFilterValue(filterName, itemKey, itemValue, paramName) {
        const selectedFilter = {filtername: filterName, source: this.state[filterName], paramname: paramName};
        if (selectedFilter.source[itemKey].selected) {
            selectedFilter.source[itemKey].selected = false;
        } else {
            selectedFilter.source[itemKey].selected = true;
        }
        this.setState({filterName: selectedFilter.source});
        this.updateFilterStatuses(selectedFilter);
        this.composeFilterQuery();
    }

    updateFilterStatuses(filter) {
        let found = false;
        for (let i = 0; this.state.filters.length > i; i++) {
            if (this.state.filters[i].filtername === filter.filtername) {
                this.state.filters[i] = filter;
                found = true;
            }
        }
        if (!found) {
            this.state.filters.push(filter);
        }
    }

    selectFilterDates(momentsArray) {
        if (momentsArray[0]) {
            const selectedStartFilter = {
                filtername: 'startDateFilter',
                source: [{name: momentsArray[0].format('YYYYMMDD').toString(), selected: true}],
                paramname: 'last_updated >=',
            };
            this.updateFilterStatuses(selectedStartFilter);
        }
        if (momentsArray[1]) {
            const selectedEndFilter = {
                filtername: 'endDateFilter',
                source: [{name: momentsArray[1].format('YYYYMMDD').toString(), selected: true}],
                paramname: 'last_updated <=',
            };
            this.updateFilterStatuses(selectedEndFilter);
        }
        this.composeFilterQuery();
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
                    <header className="header">
                        <div className="header_filter">
                            <TrashPointDateFilter
                                filterValueSelectedCallback={this.selectFilterDates}
                            />
                            <h1 className="header__text">Filter by</h1>
                        </div>
                    </header>
                    <div className="onmap-filter__filters">

                        <div className="onmap-filter__item" />
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
                                                    key={this.state.statusFilter[key].name + '__' + item}
                                                    onClick={() => this.selectFilterValue('statusFilter',
                                                        key, this.state.statusFilter[key].name, 'status=')}
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
                                            {this.state.resourceFilter.map((item, key) => (
                                                <div
                                                    role="none"
                                                    className={'select-options__item' +
                                                    (this.state.resourceFilter[key].selected ? ' selected' : '')}
                                                    key={this.state.resourceFilter[key].name + '__' + item}
                                                    onClick={() => this.selectFilterValue('resourceFilter',
                                                        key, this.state.resourceFilter[key].name, 'type=')}
                                                >
                                                    {this.state.resourceFilter[key].name}
                                                    <span className="radiobtn" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
