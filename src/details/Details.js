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
        this.setState({trashPoint});
    }

    render() {
        return (
            <div className="details-container">
                <div className="row tpr">
                    <h3>static text</h3>
                    <a href="#" className="next">See a country list &raquo;</a>

                </div>
            </div>
        );
    }
}
