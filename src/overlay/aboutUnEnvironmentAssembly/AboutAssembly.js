import React, {Component} from 'react';
import PropTypes from 'prop-types';
import OverlayWindow from '../OverlayWindow';
import AssemblyIntroText from './AssemblyIntroText';
import {AssemblyCountrySwitcher, DetailedCountryInfo} from './AssemblyCountrySwitcher';
import AssemblyDisclaimer from './AssemblyDisclaimer';
import countries from '../../json/environment-assembly.json';

export default class AboutAssembly extends Component {
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
    constructor(props) {
        super(props);
        this.state = {
            selectedCountry: countries[0],
        };
    }
    onCountrySelected = (country) => {
        this.setState({selectedCountry: country});
    };

    render() {
        return (
            <OverlayWindow
                className="assembly-content"
                visible={this.props.visible}
                onClose={this.props.onClose}
            >
                <AssemblyIntroText />
                <AssemblyCountrySwitcher
                    countries={countries}
                    onCountrySelected={this.onCountrySelected}
                />
                <DetailedCountryInfo country={this.state.selectedCountry} />
                <AssemblyDisclaimer />
            </OverlayWindow>
        );
    }
}
