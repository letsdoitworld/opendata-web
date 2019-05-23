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
                        <h1 className="header__text">Mismanaged waste reports</h1>
                    </header>

                    <section className="section">
                        <h3 className="intro">Contributing with Data</h3>
                        <p>
                            If you already have data from cleanups, surveys, drones, brand audits or other waste data and are happy to share, we would like to add it to our platform!
                        </p>
                    </section>

                    <section className="section">
                        <h3 className="intro">Contributing with Research Development</h3>
                        <p>
                            We have multiple ongoing research projects, some examples are precision mapping, economic waste index development, and artificial intelligence. We seek collaborators at any skill level to help us develop new data sets and tools to help end mismanaged waste.
                        </p>
                    </section>
                    <section className="section">
                        <h3 className="intro">Contributing with Expert Advice</h3>
                        <p>
                            If you are a developer, scientist, policy maker, or manager and want to share your knowledge to help us on our mission to end mismanaged waste and destruction of resources, get in touch! We will see in which way your knowledge may be most useful and as our future programmes roll out. Join us on <a target="_blank" rel="noopener noreferrer" href="https://github.com/letsdoitworld/">GitHub</a>!
                        </p>
                    </section>

                    <section className="section">
                        <p>
                            If you are interested in contributing with any of these topics, write to&nbsp;
                            <a href="mailto:kristiina@letsdoitworld.org">kristiina@letsdoitworld.org</a>
                        </p>
                    </section>
                </main>
            </div>
        );
    }
}
