import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import { issSignedIn } from './services/security';

const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route {...rest}
            render={({ location }) => 
                issSignedIn() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>

                <PrivateRoute path="/home">
                    <Home />
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;