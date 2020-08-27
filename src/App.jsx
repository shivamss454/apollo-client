import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import localStorage from 'local-storage';
import { InputDemo } from './pages/InputDemo';
import AuthRoute from './Routes/AuthRoute';
import PrivateRoute from './Routes/PrivateRoute';
import TextFieldDemo from './pages/TextFieldDemo';
import ChildrenDemo from './pages/ChildrenDemo/ChildrenDemo';
import Trainee from './pages/Trainee/Trainee';
import NotFoundRoute from './pages/NoMatch/NoMatch';
import SnackbarProvider from './contexts';
import { ApolloProvider } from '@apollo/react-components';
import apolloclient from './libs/apollo-client';
import Wrapper from './pages/Login/Wrapper';

function App() {
  return (
    <div>
      <SnackbarProvider>
        <ApolloProvider client={apolloclient}>
        {localStorage.get('token')
          ? (
            <BrowserRouter>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/trainee" />
                </Route>
                <AuthRoute path="/Login" component={Wrapper} />
                <PrivateRoute path="/trainee" component={Trainee} />
                <PrivateRoute path="/text-field-demo" component={TextFieldDemo} />
                <PrivateRoute path="/input-demo" component={InputDemo} />
                <PrivateRoute path="/children-demo" component={ChildrenDemo} />
                <PrivateRoute component={NotFoundRoute} />
              </Switch>
            </BrowserRouter>
          )
          : (
            <BrowserRouter>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/Login" />
                </Route>
                <AuthRoute path="/Login" component={Wrapper} />
                <PrivateRoute path="/trainee" component={Trainee} />
                <PrivateRoute path="/text-field-demo" component={TextFieldDemo} />
                <PrivateRoute path="/input-demo" component={InputDemo} />
                <PrivateRoute path="/children-demo" component={ChildrenDemo} />
                <PrivateRoute component={NotFoundRoute} />
              </Switch>
            </BrowserRouter>
          )}
          </ApolloProvider>
      </SnackbarProvider>
    </div>
  );
}
export default App;
