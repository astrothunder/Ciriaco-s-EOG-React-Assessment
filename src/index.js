import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider, createClient } from 'urql';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const UrqlApp = () => {
  return (
    <Provider value={client}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<UrqlApp />, document.getElementById('root'));
