import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class LoadingScreen extends Component {
    static get propTypes() {
        return {
            loaded: PropTypes.bool,
            onProceed: PropTypes.func,
        };
    }
    static get defaultProps() {
        return {
            loaded: false,
            onProceed: () => {},
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            timerStarted: false,
            countDown: 2000,
        };
    }
    onProceed = (e) => {
        e.preventDefault();
        clearInterval(this.timer);
        this.props.onProceed();
    }
    startCounter = () => {
        this.timer = setInterval(() => {
            this.setState({
                timerStarted: true,
                countDown: (this.state.countDown - 1000),
            });
            if (this.state.countDown <= 0) {
                clearInterval(this.timer);
                setTimeout(this.props.onProceed, 1000);
            }
        }, this.state.countDown / (this.state.countDown / 1000));
    }
    render() {
        if (this.props.loaded && !this.state.timerStarted) {
            this.startCounter();
        }
        return (
            <div className="loading-screen">
                <h1>A world without waste is our dream.</h1>
                <p>
                    People have mapped hundreds of thousands of trash points already.
                </p>
                {this.props.loaded ?
                    <a onClick={this.onProceed} href="#0">Check it out ({this.state.countDown / 1000}s)</a> :
                    <p>Loading...</p>
                }
            </div>
        );
    }
}
