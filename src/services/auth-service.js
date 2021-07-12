import React, {createContext, useContext} from "react";
import {FirebaseContext} from "./firebase-service";

const AuthContext = createContext(null);

export class AuthProvider extends React.Component {
    static contextType = FirebaseContext;

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: null,
            authState: 1
        }
        console.log(this.context);
        this.firebase = this.context;
        this.auth = this.firebase.auth();
        this.db = this.firebase.firestore();
    }

    componentDidMount() {
        this.unsubscribe = this.auth.onAuthStateChanged(fbUser => {
            if (fbUser) {
                console.log("Logging In");
                this.db.collection("users").doc(fbUser.email).get().then(userDoc => {
                    console.log("setting user");
                    this.setState({
                        user: userDoc.data(),
                        authState: 2
                    });
                }).catch(error => {
                    console.log(error);
                    this.setState({
                        user: null,
                        authState: 0
                    });
                });
            } else {
                console.log("Logging Out");
                this.setState({user: null, authState: 0});
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const auth = {
            user: this.state.user,
            authState: this.state.authState,
            logIn: (email, password, cb) => {
                this.auth.signInWithEmailAndPassword(email, password).then(_ => {
                    cb();
                }).catch(error => console.log(error));
                this.setState({user: this.state.user, authState: 1});
            },
            logOut: cb => {
                this.auth.signOut().then(() => {
                    console.log("Successfully Logged Out")
                    cb();
                }).catch(error => {
                    console.log(error);
                });
                this.setState({user: this.state.user, authState: 1});
            }
        };
        return <AuthContext.Provider value={auth}>
            {this.props.children}
        </AuthContext.Provider>
    }
}

export const useAuth = () => {
    return useContext(AuthContext);
}
