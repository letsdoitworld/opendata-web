import React from 'react';
import {HashRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';

function unregisterServiceWorker() {
    if (navigator && navigator.serviceWorker) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            for (const registration of registrations) {
                registration.unregister();
            }
        });
    }
}
unregisterServiceWorker();

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));
