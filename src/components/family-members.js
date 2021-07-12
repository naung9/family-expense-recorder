import React from "react";
import {TextField} from "@material-ui/core";
import {useFirebase} from "../services/firebase-service";
import {useAuth} from "../services/auth-service";
import PropTypes from "prop-types";
import EnhancedTable from "./utilitiy-components/table";

class FamilyMembersCls extends React.Component{
    constructor(props) {
        console.log("Constructing Family Members");
        super(props);
        this.state = {
            members: [],
            newFamilyMember: {
                name: "",
                email: "",
                role: "",
                profilePic: ""
            }
        }
        this.firebase = this.props.firebase;
        this.db = this.firebase.firestore();
        this.auth = this.props.auth;
        this.headCells = [
            {id: 'name', numeric: false, disablePadding: false, label: 'Name'},
            {id: 'email', numeric: false, disablePadding: false, label: 'Email'},
            {id: 'role', numeric: false, disablePadding: false, label: 'Role'},
            {id: 'profilePic', numeric: false, disablePadding: false, label: 'Profile', type: "image"},
        ];
        const marginStyle = {marginTop: 5}
        this.modalContent = <>
            <TextField style={marginStyle} id={"name"} name={"name"} label={"Name"} variant={"outlined"} fullWidth required onChange={(event)=>this.setState({ newFamilyMember: {...this.state.newExpense, name: event.target.value}})} />

            <TextField style={marginStyle} type={"email"} id={"email"} name={"email"} label={"Email"} variant={"outlined"} fullWidth onChange={(event)=>this.setState({ newFamilyMember: {...this.state.newExpense, email: event.target.value}})} />

            <TextField style={marginStyle} id={"role"} name={"role"} label={"Role"} variant={"outlined"} fullWidth onChange={(event)=>this.setState({ newFamilyMember: {...this.state.newExpense, role: event.target.value}})} />

            <TextField style={marginStyle} type={"file"} id={"profilePic"} name={"profilePic"} label={"Profile Picture"} variant={"outlined"} fullWidth required onChange={(event)=>this.setState({ newFamilyMember: {...this.state.newExpense, profilePic: event.target.value}})} />
        </>;
    }

    componentDidMount() {
        this.unsubscribe = this.db.collection("users").where("family.id", "==", this.auth.user.family.id).onSnapshot(membersSnapShot => {
            console.log("New Data Incoming");
            let data = [];
            if (membersSnapShot) {
                membersSnapShot.forEach(memberRef => {
                    data.push({...memberRef.data(), id: memberRef.id});
                });
                console.log(data);
                this.setState({members: data});
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return <EnhancedTable title={`Expenses In ${this.state.year}`} data={this.state.members} headCells={this.headCells} modalContent={this.modalContent} saveFunction={(cb)=>{
            this.db.collection("users").add(this.state.newFamilyMember).then(res => {
                console.log(res);
                cb();
            }).catch(error => {
                console.log(error);
                cb();
            });
        }} />;
    }
}

FamilyMembersCls.propTypes = {
    auth: PropTypes.object.isRequired,
    firebase: PropTypes.object.isRequired
}

export default function FamilyMembers(){
    const firebase = useFirebase();
    const auth = useAuth();
    return <FamilyMembersCls auth={auth} firebase={firebase} />;
}
