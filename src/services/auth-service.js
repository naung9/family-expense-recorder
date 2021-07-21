import React, {createContext, useContext} from "react";
import {FirebaseContext} from "./firebase-service";

const AuthContext = createContext(null);

const createUser = (db, user, cb, errorCb)=>{
    db.collection("users").doc(user.email).set(user).then(res => {
        console.log(res);
        cb();
    }).catch(error => {
        errorCb(error);
    });
}

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
        this.storage = this.firebase.storage();
        this.db = this.firebase.firestore();
    }

    componentDidMount() {
        this.unsubscribe = this.auth.onAuthStateChanged(fbUser => {
            if (fbUser) {
                this.setState({
                    user: fbUser,
                    authState: 2
                });
            } else {
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
            },
            signUp: (user, password, progressCb, doneCb, errorCb) => {

                this.auth.createUserWithEmailAndPassword(user.email, password).then(userCreds => {
                    if(user.profilePic){
                        const imageRefName = 'profile_images/'+ user.profilePic.name;
                        const uploadTask = this.storage.ref().child(imageRefName).put(user.profilePic);
                        uploadTask.on(this.firebase.storage.TaskEvent.STATE_CHANGED,
                            (snapshot) =>{
                                let progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
                                if(progressCb)progressCb(progress);
                            },(error) =>{
                                if(errorCb)errorCb(error);
                            },() =>{
                                uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
                                    userCreds.user.updateProfile({displayName: user.name, photoURL: url}).then(res => {
                                        if(doneCb)doneCb();
                                    }).catch(error=>{if(errorCb)errorCb(error)});
                                });
                            }
                        )
                    }else{
                        userCreds.user.updateProfile({displayName: user.name}).then(res => {
                            if(doneCb)doneCb();
                        }).catch(error=>{if(errorCb)errorCb(error)});
                    }
                }).catch(error => console.log(error));
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

