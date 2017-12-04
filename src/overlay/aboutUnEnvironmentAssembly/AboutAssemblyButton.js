import React from 'react';
import PropTypes from 'prop-types';

const AboutAssemblyButton = ({onClick}) => (
    <a role="button" className="assembly-button" tabIndex={0} onClick={onClick}>
        <img alt="Info" src="img/about/classroom.svg" />
    </a>
);
AboutAssemblyButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default AboutAssemblyButton;
