import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class GetInvolved extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    static get defaultProps() {
        return {
            className: this.aboutClassName,
        };
    }


    render() {
        return (
            <div className={this.props.className}>
                <main className="main-content about-page">
                    <header className="header">
                        <h1 className="header__text">Mismanaged trash reports</h1>
                    </header>

                    <section className="section">
                        <h3 className="intro">Why we created this platform</h3>
                        <p>
                            Text to be added later
                        </p>


                    </section>

                    <div className="header">
                        <h2 className="header__text">World Waste Index</h2>
                    </div>

                    <section className="section">
                        <h3>What is World Waste Index</h3>
                        <p>
                            Let’s Do It! World is a civic-led mass movement that began in Estonia
                             in 2008 when 50,000 people united together to clean
                              up the entire country
                              in just five hours. Since then, Let’s Do It! has spread this model—one
                               country in one day—around the world. To date, nearly 120 countries
                                and 20 million people have joined us to clean up illegal waste.
                        </p>
                        <h3>How it’s calculated</h3>
                    </section>

                </main>
            </div>
        );
    }
}
