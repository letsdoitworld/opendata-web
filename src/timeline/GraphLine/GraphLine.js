import React, {Component} from 'react';
import vis from 'vis';
import PropTypes from 'prop-types';

export default class GraphLine extends Component {
    static get propTypes() {
        return {
            options: PropTypes.object,
            middlePoint: PropTypes.instanceOf(Date),
            onChangeTimeLine: PropTypes.func,
            graphData: PropTypes.array,
        };
    }
    static get defaultProps() {
        return {
            options: {},
            middlePoint: new Date(),
            onChangeTimeLine: () => {},
            graphData: [],
        };
    }
    static getBarPoints(data) {
        return data.map((element, index, array) => {
            const numberOfReports = parseInt(element.number_of_reports, 10);
            if (index === 0) {
                return {
                    day: element.day,
                    number_of_reports: numberOfReports,
                };
            }
            const prevNumberOfReports = parseInt(array[index - 1].number_of_reports, 10);
            return {
                day: element.day,
                number_of_reports: numberOfReports - prevNumberOfReports,
            };
        });
    }
    componentDidMount() {
        this.initGraph(this.props.middlePoint, this.props.graphData);
        this.animate();
    }
    animate() {
        setTimeout(() => {
            this.graph2d.moveTo(new Date(), {animation: {duration: 2000}});
        }, 1000);
    }
    initGraph(middlePoint, data) {
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 5);

        const minDate = new Date('2010-01-01');
        minDate.setFullYear(minDate.getFullYear() - 5);

        const graphContainer = document.getElementById('visualization-top-row');
        const graphData = GraphLine.getBarPoints(data)
            .map(e => ({x: e.day, y: e.number_of_reports}));
        const datasetGraph = new vis.DataSet(graphData);
        this.graph2d = new vis.Graph2d(graphContainer, datasetGraph, this.props.options);
        this.graph2d.setOptions({
            // showCurrentTime is false since there is
            // no need to reposition current time bar because it is static always
            // instead static bar is rendered with className 'vis-current-time'
            showCurrentTime: false,
            showMajorLabels: false,
            showMinorLabels: false,
            max: maxDate,
            min: minDate,
            style: 'bar',
            timeAxis: {scale: 'year', step: 0.5},
            drawPoints: false,
            dataAxis: {
                visible: false,
                left: {
                    range: {
                        min: 0,
                    },
                },
            },
        });
        const onChangeGraph = (range) => {
            this.props.onChangeTimeLine(range.start, range.end);
        };
        this.graph2d.on('rangechange', onChangeGraph);
        this.graph2d.moveTo(middlePoint, {animation: false});
    }
    render() {
        return (
            <div className="outer-top-row">
                <div id="visualization-top-row" />
                <div className="vis-current-time current-time" />
            </div>
        );
    }
}
