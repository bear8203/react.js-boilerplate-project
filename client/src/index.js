import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import 'antd/dist/antd.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
// import * as serviceWorker from './serviceWorker';

// redux to store objects
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
// redux to store promises
import promiseMiddleware from 'redux-promise';
// redux to store functions
import ReduxThunk from 'redux-thunk';
// ./_reducers => ./_reducers/index.js
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);


ReactDOM.render(
  <provider
    store={createStoreWithMiddleware(Reducer,
      // Chrome Redux Development Extension : https://github.com/zalmoxisus/redux-devtools-extension
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
  >
    <App />
  </provider>
  , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
