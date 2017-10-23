import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppleBadge from './AppleBadge';
import GoogleBadge from './GoogleBadge';

export default class Collector extends Component {
    static get propTypes() {
        return {
            collector: PropTypes.object,
        };
    }
    static get defaultProps() {
        return {
            collector: {},
        };
    }
    render() {
        const collector = this.props.collector;
        return (
            <div>
                <div className="row">
                    {collector.googleUrl || collector.appleUrl ?
                        <h3>
                            Download the app and start mapping out your
                            local trash to help out the community:
                        </h3> : null}
                    {collector.webAppUrl ?
                        <h3>
                            Start mapping out your
                            local trash to help out the community:
                        </h3> : null}
                </div>
                <div className="row badges-container">
                    <div className="name-logo">
                        <img className="logo" src={`img/logos/${collector.id}.png`} alt="" />
                        <div className="name-container">
                            <h3>{collector.name}</h3>
                            <a href={collector.href}>{collector.url}</a>
                        </div>
                    </div>
                    <div className="badges">
                        {collector.googleUrl ?
                            <GoogleBadge
                                url={collector.googleUrl}
                            /> : null}
                        {collector.appleUrl ?
                            <AppleBadge
                                url={collector.appleUrl}
                            /> : null}
                        {collector.webAppUrl ?
                            <div className="web-app">
                                <a href={collector.webAppUrl}>{collector.webAppUrl}</a>
                            </div> : null}
                    </div>
                </div>
            </div>
        );
    }
}
