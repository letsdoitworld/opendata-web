import React, {Component} from 'react';
import {FacebookIcon, FacebookShareButton} from 'react-share';

export default class FacebookShareWrapper extends Component {
    render() {
        const facebookShare = () => (<div><FacebookIcon round size={32} /> </div>);

        return (
            <FacebookShareButton url={window.location.href} children={facebookShare()} />
        );
    }
}
