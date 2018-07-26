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
                <main className="main-content info-page">
                    <header className="header">
                        <h1 className="header__text">Welcome to World Waste Platform demo</h1>
                    </header>

                    <section className="section">
                        <div>
                            <p>The World Waste Platform’s main goals are to make mismanaged waste (including
                             illegal dumping and littering) visible around the globe,
                             and to show the evolution of waste management around the world. To create the World Waste Index, we use an advanced algorythm to assess the quality
                              of waste management of countries that includes illegal waste in environment, the quantity of waste collected, the recycling rate, what kind of waste
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

                        <div className="info-chart">
                            <img src="http://ec.europa.eu/eurostat/documents/4187653/8516116/Municipal+waste/5e7630aa-d03d-4bed-960c-0b4764fd2f41?t=1516631338953" alt=""/>
                        </div>

                        <div className="info-container">
                            <div>
                                <h3 className="h3">USA</h3>
                                <img src="/img/environment-assembly/usa.png" alt="USA"/>
                            </div>
                            <div>
                                <h4 className="h4">Municipal waste:</h4>
                                <p>Mismanaged disposal, not collected <strong>0%</strong></p>
                                <p>Recycled and composted <strong>23.8%</strong></p>
                                <p>Not recycled/composted <strong>76.2%</strong></p>
                                <p>Number of people <strong>324 459 463</strong></p>
                                <p>MSW per person <strong> 704.60 kg</strong></p>
                                <p>MSW per country <strong>228 614 990 kg</strong></p>
                                <p>GDP US2016 <strong>57 466</strong> dollars per person</p>
                            </div>
                        </div>

                        <div className="info-container">
                            <div>
                                <h3 className="h3">Kenya</h3>
                                <img src="https://opendata.letsdoitworld.org/img/environment-assembly/kenya.png" alt="Kenya"/>
                            </div>
                            <div>
                                <h4 className="h4">Municipal waste:</h4>
                                <p>Mismanaged disposal, not collected <strong>70%</strong></p>
                                <p>Recycled and composted <strong>0%</strong></p>
                                <p>Not recycled/composted <strong>30%</strong></p>
                                <p>Number of people <strong>49 699 862</strong></p>
                                <p>MSW per person <strong>109.50 kg</strong></p>
                                <p>MSW per country <strong>5 442 134.89 kg</strong></p>
                                <p>GDP US2016 <strong>3 155</strong> dollars per person</p>
                            </div>
                        </div>

                        <div className="info-container">
                            <div>
                                <h3 className="h3">Thailand</h3>
                                <img src="/img/environment-assembly/thailand.png" alt="Thailand"/>
                            </div>
                            <div>
                                <h4 className="h4">Municipal waste:</h4>
                                <p>Mismanaged disposal, not collected <strong>60%</strong></p>
                                <p>Recycled and composted <strong>11%</strong></p>
                                <p>Not recycled/composted <strong>29%</strong></p>
                                <p>Number of people <strong>69 037 513</strong></p>
                                <p>MSW per person <strong>367.54 kg</strong></p>
                                <p>MSW per country <strong>25 374 273 kg</strong></p>
                                <p>GDP US2016 <strong>16 916</strong> dollars per person</p>
                            </div>
                        </div>

                        <div className="info-container">
                            <div>
                                <h3 className="h3">Germany</h3>
                                <img src="/img/environment-assembly/germany.png" alt="Germany"/>
                            </div>
                            <div>
                                <h4 className="h4">Municipal waste:</h4>
                                <p>Mismanaged disposal, not collected <strong>0%</strong></p>
                                <p>Recycled and composted <strong>64%</strong></p>
                                <p>Not recycled/composted <strong>36%</strong></p>
                                <p>Number of people <strong>82 114 224</strong></p>
                                <p>MSW per person <strong>625.00 kg</strong></p>
                                <p>MSW per country <strong>51 321 390 kg</strong></p>
                                <p>GDP US2016 <strong>48 729</strong> dollars per person</p>
                            </div>
                        </div>

                        <div className="info-container">
                            <div>
                                <h3 className="h3">Argentina</h3>
                                <img src="/img/environment-assembly/argentina.png" alt="Argentina"/>
                            </div>
                            <div>
                                <h4 className="h4">Municipal waste:</h4>
                                <p>Mismanaged disposal, not collected <strong>35%</strong></p>
                                <p>Recycled and composted <strong>0%</strong></p>
                                <p>Not recycled/composted <strong>65%</strong></p>
                                <p>Number of people <strong>44 271 041</strong></p>
                                <p>MSW per person <strong>309.33 kg</strong></p>
                                <p>MSW per country <strong>13 694 435 kg</strong></p>
                                <p>GDP US2016 <strong>19 934</strong> dollars per person</p>
                            </div>
                        </div>

                        <div className="info-disclaimer">
                            Disclaimer: The foregoing leaves the possibility to have numbers that make sense even if no data is available for mismanaged - much as this distorts the rankings, still a number will be calculated, using an asterisk on the number or give it a different colour/pitch to warn it does not include reliable data on mismanaged waste. In result, most resource-efficient countries will show highest scores, and the less efficient ones lowest scores.
                        </div>

                    </section>

                </main>

            </div>
        );
    }
}/* eslint-enable */
