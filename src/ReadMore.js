import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ReadMore extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    static get defaultProps() {
        return {
            className: this.aboutClassName,
        };
    }

    /*eslint-disable */
    render() {
        return (
            <div className={this.props.className + ' overflow-scroll'}>
                <main className="main-content about-page">
                    <div className="modal-content">
                        <div>
                            <h1>Welcome to World Waste Index demo</h1>
                            <p>The World Waste Map’s main goals are to make mismanaged waste (including
                             illegal dumping and littering) visible around the globe,
                             and to show the evolution of waste managment around the world. To create the World Waste Index, we use an advanced algorythm to assess the quality
                              of waste management of countries that includes illegal waste in environment, the quanity of waste collected, the recycling rate, what kind of waste
                               prevention mechanisms are present, etc.</p><p><b>The World Waste Index is divided into two parts:</b>
                        </p>
                            <ul>
                                <li>The first part shows the state
                                of the country’s waste management and is shown in the current index demo.
                                </li>
                                <li>The second part of the index will be based on the litter data
                                 collected from data our citizen scientists collect using the World Cleanup app. That methodology is still in the development and can currently
                                  be shown as raw locations of each survey in the form of heatmaps.
                                </li>
                            </ul>
                            <p>The final index will combine the two parts to indicate the evolution
                                   of national waste management strategies, and show how much waste exists out of the formal system.</p>
                            <p>This is our first demo of the index
                                   and we welcome feedback and contributions.</p><h2>
                            How is World Waste Index (WWI) calculated?</h2><p>
                            The current index is calculated with this formula:
                            <br/>
                            <b>unitGDP/unitMSW * ( 1 + (recycled-composted) % ) * ( 1 – mismanaged % ) </b>
                        </p><p><b>Three key components of the calculation:</b></p>
                            <ul>
                                <li><u>Unit GDP divided by unit municipal waste</u>
                                    (MSW): irrespective of how a country manages their waste, this represents the "environmental footprint" of the production-consumption patterns
                                    in a given country (intensity in the use of resources).
                                </li>
                                <li><u>Percentage of recycled-composted waste</u>: this gives the best proxy for materials that are recirculating in the economy. For most countries, we use the percentage of separately collected, which is closely related to recycled-composted.
                                </li>
                                <li><u>Percentage of uncollected or mismanaged (litter, dumpsites)</u>– it is difficult to find consistent data on mismanaged waste from all countries, we make our best effort to find institutional datasets that may be more or less closely correlated. In lieu of institutional data we will develop models of mismanged waste based on citizen science data we collect on litter.
                                </li>
                            </ul>
                        </div>
                        <div><h2>Municipal waste arisings kg/per person</h2>
                            <div className="bar-graph">

                                <div className="country-container">
                                    <div className="bar-container">
                                        <div className="bar recycled"/>
                                        <div className="bar landfill"/>
                                    </div>
                                    <div className="bar mismanaged"/>
                                </div>
                                <small className="country-index">
                                    Waste Index 100.97
                                </small>
                                <div className="country-name">USA</div>
                            </div>
                            <div className="country-container">
                                <div className="bar-container">
                                    <div className="bar recycled"></div>
                                    <div className="bar landfill"></div>
                                    <div className="bar mismanaged"></div>
                                </div>
                                <small className="country-index">
                                    Waste Index 8.64
                                </small>
                                <div className="country-name">Kenya</div>
                            </div>
                            <div className="country-container">
                                <div className="bar-container">
                                    <div className="bar recycled"></div>
                                    <div className="bar landfill"></div>
                                    <div className="bar mismanaged"></div>
                                </div>
                                <small className="country-index">
                                    Waste Index 20.43
                                </small>
                                <div className="country-name">Thailand</div>
                            </div>
                            <div className="country-container">
                                <div className="bar-container">
                                    <div className="bar recycled"></div>
                                    <div className="bar landfill"></div>
                                    <div className="bar mismanaged"></div>
                                </div>
                                <small className="country-index">
                                    Waste Index 127.86
                                </small>
                                <div className="country-name">Germany</div>
                            </div>
                            <div className="country-container">
                                <div className="bar-container">
                                    <div className="bar recycled"></div>
                                    <div className="bar landfill"></div>
                                    <div className="bar mismanaged"></div>
                                </div>
                                <small className="country-index">
                                    Waste Index  41.89
                                </small>
                                <div className="country-name">Argentina</div>
                            </div>
                        </div>
                        <small className="legend mismanaged">Mismanaged/not collected</small>
                        <br/>
                        <small className="legend recycled">Recycled/composted</small>
                        <br/>
                        <small className="legend landfill">Collected and not recycled/composted</small>
                        <br/>
                        <small>* Click on the country name for more information below.</small>
                    </div>
                    <div className="info-container">
                        <div><h3>Germany</h3><a className="img-container" target="_blank"
                                                href="https://worldcleanupday.carto.com/builder/d65b80e8-14dd-4138-88af-b0786a743e05/embed"><img
                            src="img/environment-assembly/germany.png" alt="Germany"/></a>
                            <div>
                                <p className="waste-index">127.86</p><p className="label">World Waste Index</p></div>
                        </div>
                        <div className="info-content"><p className="header">Municipal waste:</p><p>
                            Mismanaged disposal, not collected <b>0%</b>
                        </p>
                            <p>
                                Recycled and composted <b>64%</b>
                            </p>
                            <p>
                                Not recycled/composted <b> 36%</b>
                            </p>
                            <p>Number of people <b>82 114 224</b></p><p>
                                MSW per person <b>625.00 kg</b></p>
                            <p>
                                MSW per country <b>51 321 390 kg</b></p>
                            <p>
                                GDP US2016<b>48 729</b>dollars per person</p>
                        </div>
                    </div>
                    <div>
                        <small className="header">Disclaimer:</small>
                        <small>
                            The foregoing leaves the possibility to have numbers that make sense even if no data is available for mismanaged - much as this distorts the rankings, still a number will be calculated, using an asterisk on the number or give it a different colour/pitch to warn it does not include reliable data on mismanaged waste. In result, most resource-efficient countries will show highest scores, and the less efficient ones lowest scores.
                        </small>
                        <br/>
                        <br/>
                        <small className="header">Sources:</small>
                        <br/>
                        <ul className="small">
                            <li>
                                <small>
                                    Acurio, G. et al. 1998. Diagnosis of Municipal Solid Waste Management in Latin America and the Carribbean. Joint publication of the Inter-American Development Bank and the Pan American Health Organization.
                                </small>
                            </li>
                            <li>
                                <small>
                                    Department for International Development, 1999. CNTR 98 5698 Low Cost Solid Waste Incinerator: Demand Survey and Country Selection Report.
                                </small>
                            </li>
                            <li>
                                <small>D-Waste, online waste atlas <a href="http://www.atlas.d-waste.com/">http://www.atlas.d-waste.com/</a></small>
                            </li>
                            <li>
                                <small>
                                    European Environnmental Agency, 2016. Municipal waste management across European countries.
                                </small>
                            </li>
                            <li>
                                <small>
                                    Eurostat, 2017. File:Municipal waste generated by country in selected years (kg per capita).
                                </small>
                            </li>
                            <li>
                                <small>The World Bank, 2012. What a Waste: A Global Review of Solid Waste Management.
                                </small>
                            </li>
                            <li>
                                <small>The World Bank, 2017. GDP per capita, PPP (current international $).</small>
                            </li>
                        </ul>
                    </div>
                </main>
            </div>
        );
    }
}/* eslint-enable */
