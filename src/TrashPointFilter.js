import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TrashPointFilter extends Component {
    static propTypes = {
        statusFilter: PropTypes.array,
        filterValueSelectedCallback: PropTypes.func,
        name: PropTypes.string,
        title: PropTypes.string,
    };

    static get defaultProps() {
        return {
            statusFilter: this.statusFilter,
            filterValueSelectedCallback: this.filterValueSelectedCallback,
            name: this.name,
            title: this.title,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            statusFilterShown: true,
            statusFilterSelected: [],
        };
    }

    showHideFilter(filterName) {
        const newState = {};
        newState[filterName] = !this.state[filterName];
        this.setState(newState);
    }

    selectFilterValue(filterName, filterValue) {
        this._modifyFilterValue(filterName, filterValue, true);
    }

    _modifyFilterValue(filterName, filterValue, addNotRemove) {
        const filterValuesModel = filterName + 'Selected';

        const selectedFilter = this.state[filterValuesModel];

        const indexOfFilterValue = selectedFilter.indexOf(filterValue);
        if (addNotRemove && indexOfFilterValue < 0) {
            selectedFilter.push(filterValue);
        } else if (!addNotRemove && indexOfFilterValue >= 0) {
            selectedFilter.splice(indexOfFilterValue, 1);
        } else {
            return;
        }

        const newState = {};
        newState[filterValuesModel] = selectedFilter;

        this.setState(newState, () => this.props.filterValueSelectedCallback(this.props.name, filterValue, addNotRemove));
    }

    render() {
        return (
            <section className="section with-filters">
                <div className="filter">
                    <div className="select-container">
                        <div
                            role="none"
                            className="selection"
                            onClick={() => this.showHideFilter('statusFilterShown')}
                        >
                            {this.props.title}
                        </div>
                        {this.state.statusFilterShown && (
                            <div className="select-options">
                                {this.props.statusFilter.map((key, value) => (
                                    <div
                                        role="none"
                                        className="select-options__item"
                                        key={this.props.statusFilter[value].code + '__' + value}
                                        onClick={() => this.selectFilterValue('statusFilter', key)}
                                    >
                                        {this.props.statusFilter[value].label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="filtered-values">

                    {this.state.statusFilterSelected.length > 0 && (
                        <div className="tags-container">
                            {this.state.statusFilterSelected.map(key => (
                                <div
                                    role="none"
                                    className="tags__item"
                                    key={key.code}
                                    onClick={() => this._modifyFilterValue('statusFilter', key, false)}
                                >
                                    {key.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        );
    }
}
