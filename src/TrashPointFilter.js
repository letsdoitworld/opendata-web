import lodash from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TrashPointFilter extends Component {
    static propTypes = {
        statusFilter: PropTypes.array,
        filterValueSelectedCallback: PropTypes.func,
        name: PropTypes.string,
        title: PropTypes.string,
        statusFilterSelected: PropTypes.array,
    };

    static get defaultProps() {
        return {
            statusFilter: this.statusFilter,
            statusFilterSelected: [],
            filterValueSelectedCallback: this.filterValueSelectedCallback,
            name: this.name,
            title: this.title,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            statusFilterShown: true,
        };
    }

    showHideFilter(filterName) {
        const newState = {};
        newState[filterName] = !this.state[filterName];
        this.setState(newState);
    }

    selectFilterValue(filterValue) {
        this._modifyFilterValue(filterValue, true);
    }

    _modifyFilterValue(filterValue, addNotRemove) {
        this.props.filterValueSelectedCallback(this.props.name, filterValue, addNotRemove);
    }

    render() {
        const getLabelFromCode = (code) => {
            const element = lodash(this.props.statusFilter).find(filterElement => filterElement.code === code);
            return element ? element.label : '';
        };

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
                                        onClick={() => this.selectFilterValue(key.code)}
                                    >
                                        {this.props.statusFilter[value].label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="filtered-values">

                    {this.props.statusFilterSelected.length > 0 && (
                        <div className="tags-container">
                            {this.props.statusFilterSelected.map(key => (
                                <div
                                    role="none"
                                    className="tags__item"
                                    key={key}
                                    onClick={() => this._modifyFilterValue(key, false)}
                                >
                                    { getLabelFromCode(key)}
                                    <i className="margin-left-5 fa fa-times-circle" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        );
    }
}
