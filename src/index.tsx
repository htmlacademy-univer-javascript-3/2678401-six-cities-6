import React from 'react';
import ReactDOM, {Root} from 'react-dom/client';
import {Provider} from 'react-redux';
import {App} from './App.tsx';
import {store} from './store/indexStore.ts';
import {loadOffers} from './store/action.ts';
import {offers} from './mocks/offers.ts';

store.dispatch(loadOffers(offers));

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
