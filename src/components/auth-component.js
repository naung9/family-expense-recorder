import {Redirect, Route} from "react-router-dom";
import React from "react";
import {useAuth} from "../services/auth-service";
import {LogIn} from "./login";
import Home from "./home";


export const AuthComponent = () => {
    let auth = useAuth();
    let component;
    console.log(auth.authState);
    if(auth.authState === 0)component = <LogIn />;
    else if(auth.authState === 1) component = <div>Loading</div>;
    else component = <Home />
    return component;
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export const PrivateRoute = ({ children, ...rest }) => {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
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
export const RedirectIfLoggedIn = ({ children, ...rest}) => {
    const auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                ) : (
                    children
                )
            }
        />
    )
}
