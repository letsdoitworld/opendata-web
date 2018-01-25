import React from 'react';
import PropTypes from 'prop-types';
import Helpers from '../../Helpers';

const calculateAdditionalValues = (country) => {
    const wastePerPerson = (country.municipalWaste / country.population) * 1000;
    const wasteGdpKgPerPerson = country.gdp / wastePerPerson;
    const wasteIndex = wasteGdpKgPerPerson * ((country.recycled / 100) + 1)
        * (1 - (country.mismanaged / 100));
    return {
        ...country,
        wastePerPerson,
        wasteIndex,
        wasteGdpKgPerPerson,
        landfill: 100 - country.recycled - country.mismanaged,
    };
};

const Country = ({country, onClick}) => {
    const onCountryClick = () => {
        onClick(country);
    };
    const {
        wasteIndex,
        wastePerPerson,
        recycled,
        landfill,
        mismanaged,
    } = calculateAdditionalValues(country);
    const recycledHeight = (wastePerPerson * (recycled / 100)) / 2;
    const landfillHeight = (wastePerPerson * (landfill / 100)) / 2;
    const mismanagedHeight = (wastePerPerson * (mismanaged / 100)) / 2;
    return (
        <a href="#0" onClick={onCountryClick} onMouseEnter={onCountryClick}>
            <div className="country-container">
                <div className="bar-container">
                    <div className="bar recycled" style={{height: `${recycledHeight}px`}} />
                    <div className="bar landfill" style={{height: `${landfillHeight}px`}} />
                    <div className="bar mismanaged" style={{height: `${mismanagedHeight}px`}} />
                </div>
                <small className="country-index">
                    Waste Index {wasteIndex.toFixed(2)}
                </small>
                <div className="country-name">
                    {country.name}
                </div>
            </div>
        </a>
    );
};

Country.propTypes = {
    country: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

const AssemblyCountrySwitcher = ({countries, onCountrySelected}) => (
    <div>
        <h2>Municipal waste arisings kg/per person</h2>
        <div className="bar-graph">
            {countries.map(country => (
                <Country
                    key={country.name}
                    country={country}
                    onClick={onCountrySelected}
                />
            ))}
        </div>
        <small className="legend mismanaged">Mismanaged/not collected</small>
        <br />
        <small className="legend recycled">Recycled/composted</small>
        <br />
        <small className="legend landfill">Collected and not recycled/composted</small>
        <br />
        <small>* Click on the country name for more information below.</small>
    </div>
);

AssemblyCountrySwitcher.propTypes = {
    countries: PropTypes.array.isRequired,
    onCountrySelected: PropTypes.func.isRequired,
};

const DetailedCountryInfo = ({country}) => {
    const {
        wasteIndex,
        wastePerPerson,
        landfill,
    } = calculateAdditionalValues(country);
    return (
        <div className="info-container">
            <div>
                <h3>{country.name}</h3>
                <a className="img-container" target="_blank" href={country.cartoURL}>
                    <img
                        src={`img/environment-assembly/${country.name.toLowerCase()}.png`}
                        alt={country.name}
                    />
                </a>
                <div style={{position: 'relative', bottom: '3.1rem', marginBottom: '-3.1rem', marginLeft: '0.3rem', pointerEvents: 'none'}}>
                    <p className="waste-index">{wasteIndex.toFixed(2)}</p>
                    <p className="label">World Waste Index</p>
                </div>
            </div>
            <div className="info-content">
                <p className="header">Municipal waste:</p>
                <p>Mismanaged disposal, not collected <b>{country.mismanaged}%</b></p>
                <p>Recycled and composted <b>{country.recycled}%</b></p>
                <p>Not recycled/composted <b>{landfill}%</b></p>
                <p>Number of people <b>{Helpers.separateThousands(country.population)}</b></p>
                <p>MSW per person <b>{wastePerPerson.toFixed(2)} kg</b></p>
                <p>MSW per country <b>{Helpers.separateThousands(country.municipalWaste)} kg</b></p>
                <p>GDP US2016 <b>{Helpers.separateThousands(country.gdp)}</b> dollars per person</p>
            </div>
        </div>
    );
};

DetailedCountryInfo.propTypes = {
    country: PropTypes.object.isRequired,
};

export {AssemblyCountrySwitcher, DetailedCountryInfo};
