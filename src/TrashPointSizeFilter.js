import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TrashPointSizeFilter extends Component {
    static propTypes = {
        filterValueSelectedCallback: PropTypes.func,
        name: PropTypes.string,
    };

    static get defaultProps() {
        return {
            name: this.name,
            filterValueSelectedCallback: this.filterValueSelectedCallback,
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            size: 2,
        };
    }

    setTrashSize(size) {
        this.setState({size});
        this.props.filterValueSelectedCallback(this.props.name);
        this.props.filterValueSelectedCallback(this.props.name, size, true);
    }

    render() {
        return (
            <div className={'progress progress__state_' + this.state.size} >
                <div className="progress__icons">
                    <div role="none" className="progress__icon progress__icon_hand" onClick={() => this.setTrashSize(1)} />
                    <div role="none" className="progress__icon progress__icon_trashbag" onClick={() => this.setTrashSize(2)} />
                    <div role="none" className="progress__icon progress__icon_wheelbarrow" onClick={() => this.setTrashSize(3)} />
                    <div role="none" className="progress__icon progress__icon_truck" onClick={() => this.setTrashSize(4)} />
                </div>

                <div className="progress__bar" />
                <div className="progress__description" />
            </div>
        );
    }
}
