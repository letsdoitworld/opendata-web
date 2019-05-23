import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FacebookShareButton} from 'react-share';

export default class FacebookShareWrapper extends Component {
    static propTypes = {
        linkToShare: PropTypes.string,
    };

    static get defaultProps() {
        return {
            linkToShare: '',
        };
    }

    render() {
        const url = window.location.href.substr(0, window.location.href.indexOf('#'));

        const facebookShare = () => (
            <div className="share-button">
                    <span className="share-element">Share <img src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/facebook.svg" alt="Share on Facebook" /></span>
            </div>
        );

        return (
            <FacebookShareButton url={url + '#' + this.props.linkToShare} children={facebookShare()} />
        );
    }
}
