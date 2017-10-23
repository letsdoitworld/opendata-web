import React, {Component} from 'react';
import PropTypes from 'prop-types';
import collectors from '../json/collectors.json';
import Reporters from './Reporters';
import Collector from './Collector';
import Share from './Share';
import TrashStats from './trashStats/TrashStats';
import Country from '../Country';

export default class Details extends Component {
    static get propTypes() {
        return {
            country: PropTypes.instanceOf(Country),
            trashReportIndex: PropTypes.string,
            population: PropTypes.string,
            visible: PropTypes.bool,
        };
    }
    static get defaultProps() {
        return {
            country: new Country(),
            trashReportIndex: '0',
            population: '0',
            visible: PropTypes.false,
        };
    }
    get qlikUrl() {
        const urlTemplate = 'https://opendata.letsdoitworld.org/analytics/single/?appid=3d7e26a3-298b-4cb8-aef9-80ec65196542&sheet=6b4948b1-2948-4e81-8ac0-5d4178fbf330&opt=currsel&select=country,';
        return urlTemplate + this.props.country.name;
    }
    render() {
        const gitHubAvailable = false;
        const reporters = this.props.country.reporters;
        const bestReporter = reporters.sort((r1, r2) => r2.count - r1.count)[0] || {};
        const filteredCollectors = collectors.filter(c => reporters.find(r => c.id === r.reporter));
        const reportCount = this.props.country.reportCount ?
            this.props.country.reportCount.toLocaleString() : '0';
        const reportCountInt = parseInt(this.props.country.reportCount, 10);
        const findCollector = id => collectors.find(c => c.id === id);
        const worldCleanupDay = findCollector('WorldCleanupDay');
        const bestCollector = findCollector(bestReporter.reporter);
        const collectorHasApp = collector =>
            collector.googleUrl || collector.appleUrl || collector.webAppUrl;
        const collector = reportCountInt < 1000 || !collectorHasApp(bestCollector) ?
            worldCleanupDay : bestCollector;
        const showTrashStats = false;
        return (
            <div
                id="details"
                style={{display: this.props.visible ? 'block' : 'none'}}
            >
                <div className="details-container">
                    <div className="row tpr">
                        <div className="icon-label-container tpr">
                            <span className="label">TPR index</span>
                            <h1>{this.props.trashReportIndex}</h1>
                        </div>
                        <p>
                            <span>
                                Trash Point Report index <b>(TPR index)</b> shows
                                the number of trash reports per 10,000 people.
                            </span>
                        </p>
                    </div>
                    <div className="row icons">
                        <div className="icon-container">
                            <i className="icon population" />
                            <div className="icon-label-container">
                                <div className="label">Population</div>
                                <h2>{this.props.population}</h2>
                            </div>
                        </div>
                        <div className="icon-container">
                            <i className="icon report" />
                            <div className="icon-label-container">
                                <div className="label">Reports</div>
                                <h2>{reportCount}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <span>For detailed statistics and additional data try the </span><a target="_blank" rel="noreferrer noopener" href={this.qlikUrl}>Qlik tool</a>
                            {gitHubAvailable ? (
                                <span>
                                    <span> or use the </span><a href="">trash data api</a><span> on GitHub.</span>
                                </span>
                            ) : '.'}
                        </div>
                    </div>
                    {showTrashStats ? (
                        <div>
                            <hr />
                            <TrashStats trashStats={this.props.country.trashStats} />
                        </div>
                    ) : null}
                    <hr />
                    {collector ? <Collector collector={collector} /> : null}
                    <Share />
                    <hr />
                    {filteredCollectors.length ?
                        <Reporters
                            reportCount={reportCountInt}
                            collectors={filteredCollectors}
                            reporters={reporters}
                        /> : null
                    }
                </div>
            </div>
        );
    }
}
