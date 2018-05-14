import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Details extends Component {
    static propTypes = {
        selectedTrashPoint: PropTypes.object,
    };

    static get defaultProps() {
        return {
            selectedTrashPoint: this.selectedTrashPoint,
        };
    }

    render() {
        return (
            <div className="details-container">
                <div className="row tpr">
                    <h3>TrashPoint details</h3>

                    { JSON.stringify(this.props.selectedTrashPoint)}
                </div>
            </div>
        );
    }
}
