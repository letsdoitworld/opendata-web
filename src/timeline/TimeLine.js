import React, {Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'vis/dist/vis.min.css';
import GraphLine from './GraphLine/GraphLine';
import Modes from '../Modes';

export default class TimeLine extends Component {
    static get propTypes() {
        return {
            graphData: PropTypes.array,
            onTimelineChange: PropTypes.func,
            mode: PropTypes.string,
        };
    }
    static get defaultProps() {
        return {
            graphData: [],
            onTimelineChange: () => {},
            mode: Modes.mode.WORLD,
        };
    }
    static visLabelSameWidth() {
        const ylabelWidth = $('#visualization-bottom-row .vis-labelset .vis-label').width() + ' px';
        const w1 = $('#visualization-top-row .vis-content .vis-data-axis').width();
        const w2 = $('#visualization-bottom-row .vis-labelset .vis-label').width();
        $('#visualization-top-row')[0].childNodes[0].childNodes[2].style.display = 'none';
        if (w2 > w1) {
            $('#visualization-top-row .vis-content')[1].style.width = ylabelWidth;
        } else {
            $('#visualization-bottom-row .vis-labelset .vis-label').width(w1 + ' px');
        }
    }
    static getSharedOptions() {
        return {
            height: '100%',
            zoomable: false,
            horizontalScroll: true, // this actually works ignore error in console
        };
    }
    constructor(props) {
        super(props);
        const middlePoint = this.props.mode === Modes.mode.COUNTRY ? new Date() : new Date('2010-01-01');
        this.middlePoint = new Date(middlePoint);
        this.newMiddlePoint = new Date(middlePoint);
        this.onChangeTimeLine = this.onChangeTimeLine.bind(this);
    }
    componentDidMount() {
        this.props.onTimelineChange(this.middlePoint, this.getCount(this.middlePoint));
    }
    onChangeTimeLine(startDate, endDate) {
        const newMiddlePoint = this.newMiddlePoint;
        newMiddlePoint.setTime((startDate.getTime() + endDate.getTime()) / 2);
        if (this.middlePoint.getYear() !== newMiddlePoint.getYear() ||
            this.middlePoint.getMonth() !== newMiddlePoint.getMonth()) {
            this.props.onTimelineChange(newMiddlePoint, this.getCount(newMiddlePoint));
        }
        this.middlePoint.setTime(this.newMiddlePoint.getTime());
    }
    getCount(currentDate) {
        const filteredData = this.props.graphData.filter(e => e.day <= currentDate);
        return filteredData.length ? filteredData.pop().number_of_reports : 0;
    }
    render() {
        return (
            <div
                id="timeline"
            >
                {this.props.graphData.length ?
                    <GraphLine
                        options={TimeLine.getSharedOptions()}
                        middlePoint={this.middlePoint}
                        onChangeTimeLine={this.onChangeTimeLine}
                        graphData={this.props.graphData}
                    /> : null}
            </div>
        );
    }
}
