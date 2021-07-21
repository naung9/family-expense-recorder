import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {FormGroup, InputLabel} from "@material-ui/core";
import {useAuth} from "../services/auth-service";
import {FieldError, PasswordError, validateUser} from "../services/validation-services";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const auth = useAuth();
    let initialVal = {value: "", error: ""};
    let [name, setName] = useState(initialVal);
    let [email, setEmail] = useState(initialVal);
    let [password, setPassword] = useState(initialVal);
    let [confirmPass, setConfirmPass] = useState("");
    let [profilePic, setProfilePic] = useState(null);
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                focused={!!name.error}
                                error={!!name.error}
                                helperText={name.error}
                                onChange={(e)=>{
                                    setName({value: e.target.value, error: ""});
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                type="email"
                                focused={!!email.error}
                                error={!!email.error}
                                helperText={email.error}
                                onChange={(e)=>{
                                    setEmail({value: e.target.value, error: ""});
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormGroup>
                                <InputLabel>Profile Picture</InputLabel>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="profilePic"
                                    name="profilePic"
                                    type={"file"}
                                    onChange={(e)=>{
                                        setProfilePic(e.target.files[0]);
                                    }}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                focused={!!password.error}
                                error={!!password.error}
                                helperText={password.error}
                                onChange={(e)=>{
                                    setPassword({value: e.target.value, error: ""});
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirm-password"
                                label="Confirm Password"
                                type="password"
                                id="confirm-password"
                                autoComplete="current-password"
                                onChange={(e)=>{
                                    setConfirmPass(e.target.value);
                                }}
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(event) => {
                            event.preventDefault();
                            let user = {name: name.value, email: email.value, password: password.value, confirmPassword: confirmPass, profilePic}
                            try{
                                if (validateUser(user)) {
                                    auth.signUp(user, user.password, null, null, null);
                                }
                            }catch (e){
                                if(e instanceof FieldError){
                                    if(e.getField() === "name"){
                                        setName({...name, error: e.message})
                                    }
                                    else if(e.getField() === "email"){
                                        setEmail({...email, error: e.message})
                                    }
                                }
                                else if(e instanceof PasswordError){
                                    setPassword({...password, error: e.message})
                                }
                                else{
                                    console.log(e);
                                }
                            }
                        }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
            </Box>
        </Container>
    );
}
