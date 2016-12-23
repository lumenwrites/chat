import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
/* import promise from 'redux-promise';*/
import reduxThunk from 'redux-thunk';

import routes from './routes';
import reducers from './reducers';

import App from './components/app';


const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    <Provider store={store}>
	<Router history={browserHistory} routes={routes}/>
    </Provider>
    , document.querySelector('#app'));


