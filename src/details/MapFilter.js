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
            apiURL: 'https://opendata.wemakesoftware.eu/api',
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            value: 'select',
            resourceFilter: [],
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
        for (let i = 0; this.state.filters.length > i; i++) {
            q += i === 0 ? ' where (' : ' and (';
            for (let j = 0; this.state.filters[i].source.length > j; j++) {
                q = q + (j === 0 ? ' ' : ' or ') + this.state.filters[i].paramname + "='" + this.state.filters[i].source[j].name + "'";
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
    selectFilterValue(filterName, itemKey, itemValue, paramName) {
        const selectedFilter = this.state[filterName];
        if (selectedFilter[itemKey].selected) {
            selectedFilter[itemKey].selected = false;
        } else {
            selectedFilter[itemKey].selected = true;
        }
        this.setState({filterName: selectedFilter});
        let found = false;
        const onlyselectedFilter = {filtername: filterName, source: [], paramname: paramName};
        let hazardousFilter = null;
        for (let i = 0; selectedFilter.length > i; i++) {
            if (selectedFilter[i].selected) {
                if (selectedFilter[i].name === 'hazardous') {
                    hazardousFilter = {name: 'hazardousFilter', source: [{name: 'true'}], paramname: 'hazardous'};
                } else {
                    onlyselectedFilter.source.push(selectedFilter[i]);
                }
            }
        }
        for (let i = 0; this.state.filters.length > i; i++) {
            if (this.state.filters[i].filtername === onlyselectedFilter.filtername) {
                this.state.filters[i] = onlyselectedFilter;
                found = true;
            }
        }
        if (!found) {
            this.state.filters.push(onlyselectedFilter);
        }
        if (hazardousFilter) {
            this.state.filters.push(hazardousFilter);
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
                                                    key={this.state.statusFilter[key].name + '__' + item}
                                                    onClick={() => this.selectFilterValue('statusFilter',
                                                        key, this.state.statusFilter[key].name, 'status')}
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
                                                        key, this.state.resourceFilter[key].name, 'type')}
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
