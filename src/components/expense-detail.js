import React from "react";
import {TextField} from "@material-ui/core";
import {useFirebase} from "../services/firebase-service";
import {useAuth} from "../services/auth-service";
import PropTypes from "prop-types";
import EnhancedTable from "./utilitiy-components/table";

class ExpenseDetailCls extends React.Component{
    constructor(props) {
        console.log("Constructing Expense Detail");
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            expenses: [],
            newExpense: {
                title: "",
                details: "",
                category: "",
                cost: 0
            }
        }
        this.firebase = this.props.firebase;
        this.db = this.firebase.firestore();
        this.auth = this.props.auth;
        this.headCells = [
            {id: 'submitDate', numeric: false, disablePadding: false, label: 'Date'},
            {id: 'title', numeric: false, disablePadding: false, label: 'Title'},
            {id: 'details', numeric: false, disablePadding: false, label: 'Details'},
            {id: 'category', numeric: false, disablePadding: false, label: 'Category'},
            {id: 'cost', numeric: true, disablePadding: false, label: 'Expense'},
            {id: 'submittedBy.name', numeric: false, disablePadding: false, label: 'By'},
        ];
        const marginStyle = {marginTop: 5}
        this.modalContent = <>
                <TextField style={marginStyle} id={"title"} name={"title"} label={"Title"} variant={"outlined"} fullWidth required onChange={(event)=>this.setState({ newExpense: {...this.state.newExpense, title: event.target.value}})} />

                <TextField style={marginStyle} id={"details"} name={"details"} label={"Details"} variant={"outlined"} fullWidth onChange={(event)=>this.setState({ newExpense: {...this.state.newExpense, detail: event.target.value}})} />

                <TextField style={marginStyle} id={"category"} name={"category"} label={"Category"} variant={"outlined"} fullWidth onChange={(event)=>this.setState({ newExpense: {...this.state.newExpense, category: event.target.value}})} />

                <TextField style={marginStyle} type={"number"} id={"cost"} name={"cost"} label={"Cost"} variant={"outlined"} fullWidth required onChange={(event)=>this.setState({ newExpense: {...this.state.newExpense, cost: parseInt(event.target.value)}})} />
        </>;
    }

    componentDidMount() {
        this.unsubscribe = this.db.collection("expenses").where("submittedBy.family.id", "==", this.auth.user.family.id).onSnapshot(expensesSnapShot => {
            console.log("New Data Incoming");
            let data = [];
            if (expensesSnapShot) {
                expensesSnapShot.forEach(expenseRef => {
                    let preparedData = {id: expenseRef.id, ...expenseRef.data()};
                    preparedData.submitDate = expenseRef.data().submitDate.toDate();
                    data.push(preparedData);
                });
                console.log(data);
                this.setState({expenses: data});
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return <EnhancedTable title={`Expenses In ${this.state.year}`} data={this.state.expenses} headCells={this.headCells} modalContent={this.modalContent} saveFunction={(cb)=>{
            this.db.collection("expenses").add({submittedBy: this.auth.user, submitDate: this.firebase.firestore.Timestamp.fromDate(new Date()), ...this.state.newExpense}).then(res => {
                console.log(res);
                cb();
            }).catch(error => {
                console.log(error);
                cb();
            });
        }} />;
    }
}

ExpenseDetailCls.propTypes = {
    auth: PropTypes.object.isRequired,
    firebase: PropTypes.object.isRequired
}

export default function ExpenseDetail(){
    const firebase = useFirebase();
    const auth = useAuth();
    return <ExpenseDetailCls auth={auth} firebase={firebase} />;
}
