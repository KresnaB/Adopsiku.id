import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from '@material-ui/core/styles';
import { StyledEngineProvider } from '@material-ui/core';
import { reducers, initialState } from './store/reducers';

import App from './App';
import theme from './themes';

const store = createStore(reducers, initialState, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <ThemeProvider theme={theme} >
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <App />
      </Provider>
    </StyledEngineProvider>
  </ThemeProvider>,
  document.getElementById('root'),
);
