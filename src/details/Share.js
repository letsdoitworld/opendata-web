import React, {Component} from 'react';

export default class Share extends Component {
    render() {
        const facebookUrl = 'https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fopendata.letsdoitworld.org%2F';
        const twitterUrl = 'https://twitter.com/intent/tweet/?text=People%20have%20mapped%20hundreds%20of%20thousand%20of%20trash%20points.%20Check%20it%20out!&amp;url=http%3A%2F%2Fopendata.letsdoitworld.org%2F';
        return (
            <div className="row">
                <h3>Share on:</h3>
                <div className="share">
                    <a target="_blank" href={facebookUrl}>
                        <img
                            alt="Share on Facebook"
                            src="img/share/facebook.svg"
                        />
                        <span>Facebook</span>
                    </a>
                </div>
                <div className="share">
                    <a target="_blank" href={twitterUrl}>
                        <img
                            alt="Share on Twitter"
                            src="img/share/twitter.svg"
                        />
                        <span>Twitter</span>
                    </a>
                </div>
            </div>
        );
    }
}
