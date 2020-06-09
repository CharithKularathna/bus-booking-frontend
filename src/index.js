import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { ThemeProvider } from "@material-ui/core/styles";
import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import theme from './Theme'
import registerServiceWorker from './registerServiceWorker';

import signinReducer from './store/reducers/signin'
import signupReducer from './store/reducers/signup'
import bookingReducer from './store/reducers/booking'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    signin: signinReducer,
    signup: signupReducer,
    booking: bookingReducer
})


const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
        
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
