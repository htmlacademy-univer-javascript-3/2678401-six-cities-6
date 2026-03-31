import React from 'react';
import ReactDOM, {Root} from 'react-dom/client';
import {Provider} from 'react-redux';
import {App} from './app/App.tsx';
import {store} from './store/indexStore.ts';
import {checkAuthAction} from './store/action.ts';

store.dispatch(checkAuthAction());

const root: Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
