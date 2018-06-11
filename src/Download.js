import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TrashPointFilter from './TrashPointFilter';
import TrashPointSizeFilter from './TrashPointSizeFilter';
import TrashPointDateFilter from './TrashPointDateFilter';

export default class Download extends Component {
    static propTypes = {
        downloadClassName: PropTypes.string,
        allCountries: PropTypes.array,
        apiURL: PropTypes.string,
    };

    static get defaultProps() {
        return {
            downloadClassName: this.downloadClassName,
            allCountries: this.allCountries,
            apiURL: this.apiURL,
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
    }

    filterValueSelected(filterName, filterValue, addNotRemove) {
        if (filterName && (typeof filterValue === 'undefined') && (typeof addNotRemove === 'undefined')) {
            delete this.state.selectedFilter[filterName];
            return;
        }

        let filterNameToStore = filterName;
        let filterValueToStore = filterValue.code;

        // this is a special case of filtering
        if (filterName === 'status' && filterValue.code === 'hazardous') {
            filterValueToStore = 'true';
            filterNameToStore = 'hazardous';
        }

        if (!this.state.selectedFilter[filterNameToStore]) {
            this.state.selectedFilter[filterNameToStore] = [];
        }
        if (addNotRemove) {
            this.state.selectedFilter[filterNameToStore].push(filterValueToStore);
        } else {
            this.state.selectedFilter[filterNameToStore].splice(
                this.state.selectedFilter[filterNameToStore].indexOf(filterValueToStore), 1);
        }
    }

    downloadData(e) {
        e.preventDefault();

        const urlParams = [];
        urlParams.push('download=true');
        ['status', 'hazardous', 'size', 'start_date', 'end_date', 'country_code'].forEach((filterName) => {
            if (this.state.selectedFilter[filterName] && this.state.selectedFilter[filterName].length > 0) {
                const urlParam = filterName + '=' + this.state.selectedFilter[filterName].join();
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
                        <TrashPointDateFilter
                            filterValueSelectedCallback={this.selectFilterDates}
                        />
                        <h1 className="header__text">Filter by</h1>
                    </div>
                </header>


                <TrashPointFilter
                    title={'Trash point state'}
                    name={'status'}
                    filterValueSelectedCallback={this.filterValueSelected}
                    statusFilter={this.state.statusFilter}
                />

                <TrashPointFilter
                    title={'Country'}
                    name={'country_code'}
                    filterValueSelectedCallback={this.filterValueSelected}
                    statusFilter={this.props.allCountries.map(key => ({code: key.code, label: key.name}))}
                />

                <TrashPointSizeFilter
                    filterValueSelectedCallback={this.filterValueSelected}
                    name={'size'}
                />

                <div className="action-buttons">
                    <button className="button">Clear filters</button>
                    <button className="button-filled download-button" onClick={this.downloadData}>
                        <span>Download data</span></button>
                </div>

            </div>
        );
    }
}
