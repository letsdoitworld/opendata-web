import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FacebookIcon, FacebookShareButton} from 'react-share';

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

        const facebookShare = () => (<div><FacebookIcon round size={32} /> </div>);

        return (
            <FacebookShareButton url={url + '#' + this.props.linkToShare} children={facebookShare()} />
        );
    }
}
