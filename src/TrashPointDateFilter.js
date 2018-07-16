import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import Picker from 'rc-calendar/lib/Picker';

import moment from 'moment';
import lodash from 'lodash';


const defaultCalendarValue = moment().clone();
defaultCalendarValue.add(-1, 'month');


export default class TrashPointDateFilter extends Component {
    static propTypes = {
        filterValueSelectedCallback: PropTypes.func,
        cssClass: PropTypes.string,
        selectedDate: PropTypes.array,
    };

    static get defaultProps() {
        return {
            filterValueSelectedCallback: this.filterValueSelectedCallback,
            cssClass: 'z-index-9k-float-right',
            selectedDate: null,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            statusFilterShown: true,
            statusFilterSelected: [],
        };
        this.selectDate = this.selectDate.bind(this);
    }

    selectDate(selectedDate) {
        // this.setState({selectedDate});
        this.props.filterValueSelectedCallback(selectedDate);
    }

    render() {
        const now = moment();
        const calendar = (
            <RangeCalendar
                showWeekNumber={false}
                dateInputPlaceholder={['start', 'end']}
                defaultValue={[now, now.clone().add(1, 'months')]}
                format={'DD.MM.YYYY'}
                onSelect={this.selectDate}
            />
        );

        return (

            <Picker
                prefixCls={this.props.cssClass}
                value={this.props.selectedDate}
                onChange={this.onChange}
                animation="slide-up"
                calendar={calendar}
                placement={'bottomRight'}
            >
                {
                    () => (
                        <div className="time-filter">
                            { !this.props.selectedDate && (<span>Time</span>)}
                            <div className="select-container">
                                <div className="selection">{
                                    lodash.map(
                                        this.props.selectedDate,
                                        singleDate => (singleDate ? singleDate.format('DD.MM.YYYY') : ''))
                                        .join(' - ')}</div>
                            </div>
                        </div>
                    )
                }
            </Picker>

        );
    }
}
