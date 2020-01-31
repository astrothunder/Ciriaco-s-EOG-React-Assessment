import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider, createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const subscriptionClient = new SubscriptionClient('ws://react.eogresources.com/graphql', {});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});

const UrqlApp = () => {
  return (
    <Provider value={client}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<UrqlApp />, document.getElementById('root'));
