import React from 'react';
import PropTypes from 'prop-types';

const OverlayWindow = ({visible, onClose, children, className}) => (
    <div role="none" className={className ? 'modal ' + className : 'modal'} style={{display: visible ? 'block' : 'none'}} onClick={onClose}>
        <div role="none" className="modal-background" onClick={e => e.stopPropagation()}>
            <a role="button" tabIndex={0} className="close" onClick={onClose}>&times;</a>
            <div className="modal-content">
                {children}
            </div>
        </div>
    </div>
);

OverlayWindow.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired,
};

export default OverlayWindow;
