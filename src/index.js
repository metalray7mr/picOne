import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './master.css';
import './master2.css';
import './master3.css';
import './master4.css';
import './master5.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './src/store';

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
