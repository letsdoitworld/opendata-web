import React, {Component} from 'react';
import PropTypes from 'prop-types';
import OverlayWindow from '../OverlayWindow';

export default class About extends Component {
    static get propTypes() {
        return {
            visible: PropTypes.bool,
            onClose: PropTypes.func,
        };
    }
    static get defaultProps() {
        return {
            visible: false,
            onClose: () => {},
        };
    }
    render() {
        return (
            <OverlayWindow visible={this.props.visible} onClose={this.props.onClose}>
                <img src="img/about/letsdoitworld.svg" alt="Let's do it world!" />
                <p className="center">
                    Powered by <a target="_blank" rel="noreferrer noopener" href="https://www.letsdoitworld.org">Let’s Do It Foundation</a>
                </p>
                <p className="center tighter">
                    <span>Platform is developed by </span>
                    <a target="_blank" rel="noreferrer noopener" href="https://www.proekspert.ee/">Proekspert</a>
                    <span> and </span>
                    <a target="_blank" rel="noreferrer noopener" href="http://www.infovara.ee/">Infovara</a>
                    <span> in partnership with </span>
                    <a target="_blank" rel="noreferrer noopener" href="http://www.qlik.com/us">Qlik</a>
                </p>
                <p>
                    <b>A world without waste is our dream.</b><br /><br />
                    In order to fully grasp the trash problem, we require reliable data
                    on how much trash there is in the world - and we understood that there
                    is no such database to collect this kind of data. And so the World
                    Waste Platform was born. We have put together&nbsp;
                    <a
                        target="_blank"
                        rel="noreferrer noopener"
                        href="https://opendata.letsdoitworld.org/analytics/single/?appid=3d7e26a3-298b-4cb8-aef9-80ec65196542&sheet=jjsmF&opt=currsel&select=country,World"
                    >
                        data from eight trash mapping apps
                    </a>, data compiled by&nbsp;
                    <a
                        target="_blank"
                        rel="noreferrer noopener"
                        href="http://andrewgray.ucr.edu/"
                    >
                    Gray’s Lab
                    </a>&nbsp;and we will continue this quest until all the trash is mapped.
                </p>
                <p>
                    <span>For more information please contact </span>
                    <a href="mailto:opendata@letsdoitworld.org">opendata@letsdoitworld.org</a>
                </p>
                <p>
                    <span>Media Inquiries </span>
                    <a href="mailto:margot.holts@letsdoitworld.org">margot.holts@letsdoitworld.org</a>
                </p>
                <p>
                    <span>Technical description is available: </span>
                    <a target="_blank" rel="noreferrer noopener" href="https://github.com/letsdoitworld">github.com/letsdoitworld</a>
                </p>
                <p>
                    Funders:
                    Estonian Ministry of Environment,
                    The Ministry of Foreign Affairs of the Republic of Estonia,
                    Estonian Republic 100 program
                </p>
                <p>
                    <span>You can make a difference! Start mapping illegal trash and
                        together we can clean it on </span>
                    <a target="_blank" rel="noreferrer noopener" href="https://worldcleanupday.org">World Cleanup Day 15 September 2018</a>
                </p>
                <small>
                    <b>Disclaimer:</b> Users are solely liable for how they use the
                    information about trash locations provided in the platform, including
                    their activities if they access or remove the trash. LDI is not liable
                    for the activities of users who access or remove the trash. Publication
                    of a trash location on the platform does not constitute an approval
                    or request by LDI to remove the trash. Users acknowledge that accessing
                    trash locations published on the platform and removing the trash may be
                    dangerous or illegal. Our map data relies on
                    <a className="no-highlight" target="_blank" rel="noreferrer noopener" href="https://www.openstreetmap.org/">
                        OpenStreetMap
                    </a> and population on
                    <a className="no-highlight" target="_blank" rel="noreferrer noopener" href="http://api.population.io/">
                        World Population API
                    </a> data.<br />
                    Additional sources: NOAA, Clean Cost Index.
                </small>
            </OverlayWindow>


        );
    }
}
