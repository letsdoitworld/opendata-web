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
        this.state = {data: [], url: 'https://opendata.wemakesoftware.eu/api/trashpoint/' + this.props.match.params.number};
        this.loadData();
    }
    componentDidMount() {
        EventSystem.subscribe(
            EventType.eventType.TRASHPOINT_SELECTED,
            this.trashPointSelected.bind(this));
    }
    loadData() {
        fetch(this.state.url)
            .then(response => response.json())
            .then((data) => {
                this.setState({data});
            })
            .catch(err => console.error(this.state.url, err.toString()));
    }
    trashPointSelected(trashPoint: TrashPoint) {
        this.setState({trashPoint});
    }

    render() {
        this.countryDataSTR = JSON.stringify(this.state.data.sources);
        return (
            <div className="details-container">
                <div className="row tpr">
                    <h3>TrashPoint details</h3>

                    id : { parseInt(this.props.match.params.number, 10)}
                    data : {this.countryDataSTR}
                </div>
            </div>
        );
    }
}
