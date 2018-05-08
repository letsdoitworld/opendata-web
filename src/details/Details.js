import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EventType from '../EventType';
import * as EventSystem from '../EventSystem';
import TrashPoint from '../TrashPoint';

export default class Details extends Component {
    static propTypes = {
        match: PropTypes.object,
    };

    static get defaultProps() {
        return {
            match: this.match,
        };
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        EventSystem.subscribe(
            EventType.eventType.TRASHPOINT_SELECTED,
            this.trashPointSelected.bind(this));
    }

    trashPointSelected(trashPoint: TrashPoint) {
        this.setState({trashPoint});
    }

    render() {
        return (
            <div className="details-container">
                <div className="row tpr">
                    <h3>TrashPoint details</h3>

                    id : { parseInt(this.props.match.params.number, 10)}
                </div>
            </div>
        );
    }
}
