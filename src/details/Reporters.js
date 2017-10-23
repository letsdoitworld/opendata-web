import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Reporters extends Component {
    static get propTypes() {
        return {
            reportCount: PropTypes.number,
            collectors: PropTypes.array,
            reporters: PropTypes.array,
        };
    }
    static get defaultProps() {
        return {
            reportCount: 0,
            collectors: [],
            reporters: [],
        };
    }
    render() {
        const findReporter = id => this.props.reporters.find(r => r.reporter === id);
        const calcPercent = collector =>
            (((findReporter(collector.id) || {}).count / this.props.reportCount) * 100).toFixed(2);
        const showPercent = false;
        return (
            <div className="row">
                <h3>Data collected by:</h3>
                {this.props.collectors.map((c, index) => (
                    <div className="reporter" key={index}>
                        {showPercent ?
                            <div>{calcPercent(c)} %</div> : null}
                        <div>{c.name}</div>
                        <a href={c.href}>{c.url}</a>
                    </div>
                ))}
            </div>
        );
    }
}
