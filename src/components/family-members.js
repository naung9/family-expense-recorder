// import React from "react";
// import {
//     Dialog,
//     DialogContent,
//     DialogTitle,
//     FormGroup,
//     FormLabel,
//     InputLabel,
//     MenuItem,
//     Select,
//     TextField
// } from "@material-ui/core";
// import {useFirebase} from "../services/firebase-service";
// import {useAuth} from "../services/auth-service";
// import PropTypes from "prop-types";
// import EnhancedTable from "./utilitiy-components/table";
// import MainContainer from "./home";
// import {FieldError, PasswordError, validateUser} from "../services/validation-services";
//
// class FamilyMembersCls extends React.Component {
//     constructor(props) {
//         console.log("Constructing Family Members");
//         super(props);
//         this.state = {
//             members: [],
//             newFamilyMember: {
//                 name: "",
//                 email: "",
//                 role: 2,
//                 profilePic: "",
//                 password: "",
//                 confirmPassword: ""
//             },
//             alertOpen: false,
//             alertAction: "",
//             validationError: {
//                 field: null,
//                 errorMsg: ""
//             }
//         }
//         this.firebase = this.props.firebase;
//         this.db = this.firebase.firestore();
//         this.auth = this.props.auth;
//         this.storage = this.firebase.storage();
//         this.headCells = [
//             {id: 'name', numeric: false, disablePadding: false, label: 'Name'},
//             {id: 'email', numeric: false, disablePadding: false, label: 'Email'},
//             {id: 'role', numeric: false, disablePadding: false, label: 'Role'},
//             {id: 'profilePic.url', numeric: false, disablePadding: false, label: 'Profile', isImage: true},
//         ];
//     }
//
//     componentDidMount() {
//         this.unsubscribe = this.db.collection("users").where("family.id", "==", this.auth.user.family.id).onSnapshot(membersSnapShot => {
//             console.log("New Data Incoming");
//             let data = [];
//             if (membersSnapShot) {
//                 membersSnapShot.forEach(memberRef => {
//                     const role = memberRef.data().role === 1 ? "Admin" : "Member";
//                     data.push({...memberRef.data(), id: memberRef.id, role});
//                 });
//                 console.log(data);
//                 this.setState({members: data});
//             }
//         });
//     }
//
//     componentWillUnmount() {
//         this.unsubscribe();
//     }
//
//     render() {
//         const progressUpdate = (progress) => {
//
//         }
//         const onError = (error) => {
//             console.log(error);
//         }
//         const onFinish = () => {
//             console.log("Upload Finished");
//         }
//         const marginStyle = {marginTop: 5}
//         this.modalContent = <>
//             <TextField style={marginStyle} id={"name"} name={"name"} label={"Name"} variant={"outlined"} fullWidth
//                        required onChange={(event) => this.setState({
//                 newFamilyMember: {
//                     ...this.state.newFamilyMember,
//                     name: event.target.value
//                 }
//             })}/>
//
//             <TextField style={marginStyle} type={"email"} id={"email"} name={"email"} label={"Email"}
//                        variant={"outlined"} fullWidth onChange={(event) => this.setState({
//                 newFamilyMember: {
//                     ...this.state.newFamilyMember,
//                     email: event.target.value
//                 }
//             })}/>
//
//             <Select style={marginStyle} value={this.state.newFamilyMember.role} id={"role"} name={"role"} label={"Role"}
//                     variant={"outlined"} fullWidth
//                     onChange={(event) =>
//                         this.setState({
//                             newFamilyMember: {
//                                 ...this.state.newFamilyMember,
//                                 role: parseInt(event.target.value + "")
//                             }
//                         })}>
//                 <MenuItem value={2}>Member</MenuItem>
//                 <MenuItem value={1}>Admin</MenuItem>
//             </Select>
//             <FormGroup style={marginStyle}>
//                 <InputLabel>Profile Picture</InputLabel>
//                 <TextField type={"file"} id={"profilePic"} name={"profilePic"}
//                            variant={"outlined"} fullWidth required onChange={(event) => this.setState({
//                     newFamilyMember: {
//                         ...this.state.newFamilyMember,
//                         profilePic: event.target.files[0]
//                     }
//                 })}/>
//             </FormGroup>
//             <TextField style={marginStyle} type={"password"} id={"password"} name={"password"} label={"Password"}
//                        variant={"outlined"} fullWidth onChange={(event) => this.setState({
//                 newFamilyMember: {
//                     ...this.state.newFamilyMember,
//                     password: event.target.value
//                 }
//             })}/>
//
//             <TextField style={marginStyle} type={"password"} id={"confirm-password"} name={"confirm-password"}
//                        label={"Confirm Password"}
//                        variant={"outlined"} fullWidth onChange={(event) => this.setState({
//                 newFamilyMember: {
//                     ...this.state.newFamilyMember,
//                     confirmPassword: event.target.value
//                 }
//             })}/>
//         </>;
//         return <MainContainer>
//             <EnhancedTable title={`Expenses In ${this.state.year}`} data={this.state.members}
//                            headCells={this.headCells} modalContent={this.modalContent}
//                            saveFunction={(cb) => {
//                                if(this.auth.user.role === 1) {
//                                    try {
//                                        const {password, confirmPassword, ...user} = this.state.newFamilyMember;
//
//                                        if (validateUser(this.state.newFamilyMember)) {
//                                            this.auth.signUp(user, password, progressUpdate, onFinish, onError);
//                                        }
//                                    }catch (error){
//                                        if (error instanceof FieldError){
//                                            console.log(error);
//                                        }else if(error instanceof PasswordError){
//                                            console.log(error);
//                                        }else {
//                                            console.log(error);
//                                        }
//                                    }
//                                }else {
//                                    this.setState({alertAction: "create new", alertOpen: true});
//                                }
//                                cb();
//                            }}/>
//             <Dialog open={this.state.alertOpen} onClose={()=>this.setState({alertOpen: false})} aria-labelledby="alert-dialog-title"
//                     aria-describedby="alert-dialog-description">
//                 <DialogTitle>No Permission!!!</DialogTitle>
//                 <DialogContent>
//                     You have no permission to {this.state.alertAction} members. Only admins of your family are allowed.
//                 </DialogContent>
//             </Dialog>
//         </MainContainer>;
//     }
// }
//
// FamilyMembersCls.propTypes = {
//     auth: PropTypes.object.isRequired,
//     firebase: PropTypes.object.isRequired
// }
//
// export default function FamilyMembers() {
//     const firebase = useFirebase();
//     const auth = useAuth();
//     return <FamilyMembersCls auth={auth} firebase={firebase}/>;
// }
