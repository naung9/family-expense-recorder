import {createContext, useContext} from "react";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const firebaseConfig = {
    apiKey: "AIzaSyBo4Ku13orwSSMejZys-I_xObQ8-IN_Ze4",
    authDomain: "family-expense-33071.firebaseapp.com",
    projectId: "family-expense-33071",
    storageBucket: "family-expense-33071.appspot.com",
    messagingSenderId: "1060715048367",
    appId: "1:1060715048367:web:75a6ff7c8774bbc882535a",
    measurementId: "G-895XHX9GCZ"
};


const FirebaseContext = createContext(null);

const FirebaseProvider = ({children}) => {
    if (!firebase.apps.length) {
        console.log("Initializing Firebase");
        firebase.initializeApp(firebaseConfig);
    }
    return (
        <FirebaseContext.Provider value={ firebase }>
            { children }
        </FirebaseContext.Provider>
    )
};

export const useFirebase = () => {
    return useContext(FirebaseContext);
}
export {FirebaseContext};
export default FirebaseProvider;
