import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import { publicRoutes } from '../routes';

import NotificationProvider from './providers/Notification';

function displayPublicRoutes() {
  return publicRoutes.map((publicRoute) => (
    <Route key={publicRoute.key} path={publicRoute.path} component={publicRoute.component} />
  ));
}

function App() {
  return (
    <ThemeProvider>
      <CSSReset />

      <NotificationProvider>
        <Router>
          <Switch>{displayPublicRoutes()}</Switch>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
