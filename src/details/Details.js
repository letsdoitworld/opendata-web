import React, {Component} from 'react';
import EventType from '../EventType';
import * as EventSystem from '../EventSystem';
import TrashPoint from '../TrashPoint';

export default class Details extends Component {
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
        this.setState(trashPoint);
    }

    render() {
        return (
            <div className="details-container">
                <div className="row tpr">
                    {this.state.trashPoint &&
                        <div className="icon-label-container tpr">
                            <span className="label">TrashPoints details</span>
                            <h1>{this.state.trashPoint.country}</h1>
                            <h1>{this.state.trashPoint.id}</h1>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
