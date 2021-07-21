import {AuthProvider} from "./services/auth-service";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AuthComponent, PrivateRoute, RedirectIfLoggedIn} from "./components/auth-component";
import SignUp from "./components/register";
import {Profile} from "./components/profile";
import ExpenseDetail from "./components/expense-detail";
import FamilyMembers from "./components/family-members";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path={"/"}>
            <AuthComponent />
          </Route>
          <RedirectIfLoggedIn path={"/register"}>
            <SignUp />
          </RedirectIfLoggedIn>
          <PrivateRoute path={"/profile"}>
            <Profile />
          </PrivateRoute>
          <PrivateRoute path={"/expenses"}>
            <ExpenseDetail />
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
