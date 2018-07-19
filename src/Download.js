import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TrashPointFilter from './TrashPointFilter';
import TrashPointDateFilter from './TrashPointDateFilter';

export default class Download extends Component {
    static propTypes = {
        downloadClassName: PropTypes.string,
        allCountries: PropTypes.array,
        apiURL: PropTypes.string,
        resources: PropTypes.array,
    };

    static get defaultProps() {
        return {
            downloadClassName: this.downloadClassName,
            allCountries: this.allCountries,
            apiURL: this.apiURL,
            resources: [],
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            statusFilter: [
                {code: 'CLEANED', label: 'Clean'},
                {code: 'REPORTED', label: 'Unclean'},
                {code: 'hazardous', label: 'Hazardous'},
            ],
            selectedFilter: {},
        };
        this.filterValueSelected = this.filterValueSelected.bind(this);
        this.downloadData = this.downloadData.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.selectFilterDates = this.selectFilterDates.bind(this);
    }

    selectFilterDates(momentsArray) {
        if (!momentsArray) {
            delete this.state.selectedFilter.start_date;
            delete this.state.selectedFilter.end_date;

            return;
        }

        if (momentsArray[0]) {
            this.state.selectedFilter.start_date = [momentsArray[0].format('YYYYMMDD')];
        }
        if (momentsArray[1]) {
            this.state.selectedFilter.end_date = [momentsArray[1].format('YYYYMMDD')];
        }

        this.setState({dateFilter: momentsArray});
    }

    filterValueSelected(filterName, filterValue, addNotRemove) {
        if (filterName && (typeof filterValue === 'undefined') && (typeof addNotRemove === 'undefined')) {
            delete this.state.selectedFilter[filterName];
            return;
        }

        const selectedFilter = this.state.selectedFilter;

        if (!selectedFilter[filterName]) {
            selectedFilter[filterName] = [];
        }
        if (addNotRemove) {
            if (selectedFilter[filterName].indexOf(filterValue) < 0) {
                selectedFilter[filterName].push(filterValue);
            }
        } else {
            selectedFilter[filterName].splice(
                selectedFilter[filterName].indexOf(filterValue), 1);
        }

        this.setState({selectedFilter});
    }

    clearFilters() {
        this.setState({selectedFilter: {}, dateFilter: []});
    }

    downloadData(e) {
        e.preventDefault();
        const currentFilter = this.state.selectedFilter;

        // special case for hazardous
        if (currentFilter.status && currentFilter.status.indexOf('hazardous') >= 0) {
            currentFilter.hazardous = [true];
            currentFilter.status.splice(currentFilter.status.indexOf('hazardous'), 1);
        }

        const urlParams = [];
        urlParams.push('download=true');
        urlParams.push('max_records=-1');
        ['status', 'hazardous', 'size', 'start_date', 'end_date', 'country_code', 'resource'].forEach((filterName) => {
            if (currentFilter[filterName] && currentFilter[filterName].length > 0) {
                const urlParam = filterName + '=' + currentFilter[filterName].join();
                urlParams.push(urlParam);
            }
        }, this);

        window.open(this.props.apiURL + '/reportsbyparam?' + urlParams.join('&'));
    }

    render() {
        return (

            <div className={'main-content download-page ' + this.props.downloadClassName}>
                <header className="header">
                    <div className="header_filter">
                        <div className="float-right">

                            <TrashPointDateFilter
                                filterValueSelectedCallback={this.selectFilterDates}
                                selectedDate={this.state.dateFilter}
                            />
                        </div>
                        <h1 className="header__text">Filter by</h1>
                    </div>
                </header>


                <TrashPointFilter
                    title={'Trash point state'}
                    name={'status'}
                    filterValueSelectedCallback={this.filterValueSelected}
                    statusFilter={this.state.statusFilter}
                    statusFilterSelected={this.state.selectedFilter.status}
                />

                <TrashPointFilter
                    title={'Country'}
                    name={'country_code'}
                    filterValueSelectedCallback={this.filterValueSelected}
                    statusFilter={this.props.allCountries.map(key => ({code: key.code, label: key.name}))}
                    statusFilterSelected={this.state.selectedFilter.country_code}
                />

                <TrashPointFilter
                    title={'Application'}
                    name={'resource'}
                    filterValueSelectedCallback={this.filterValueSelected}
                    statusFilter={this.props.resources.map(key => ({code: key.name, label: key.label}))}
                    statusFilterSelected={this.state.selectedFilter.resource}
                />

                <div className="action-buttons">
                    <button className="button" onClick={this.clearFilters}>Clear filters</button>
                    <button className="button-filled download-button" onClick={this.downloadData}>
                        <span>Download data</span></button>
                </div>

            </div>
        );
    }
}
