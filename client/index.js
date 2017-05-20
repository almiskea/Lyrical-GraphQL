import React from 'react';
import './style/style.css';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import SongList from './components/songlist';
import SongDetail from './components/songDetail';
import App from './components/app';
import SongCreate from './components/create-songs';

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
     </ApolloProvider>
 );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
