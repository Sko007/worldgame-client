import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store'


ReactDOM.render(
    
    <Provider store={store}>
        <head>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />

        </head>
<App />


</Provider>,



document.getElementById('root'));

serviceWorker.unregister();
