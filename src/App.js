import "./App.css";

import { FirebaseAppProvider } from "reactfire";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import Me from "./Me";
import Success from "./Success";
import Home from "./Home/Home";
import AggiungiInfo from "./Login/AggiungiInfo/index";
import AddPost from "./components/Post/AddPost";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3EyF0TT0DXTvSochmZ9t-Q4mN1CY-dJQ",
  authDomain: "sports-planet.firebaseapp.com",
  projectId: "sports-planet",
  storageBucket: "sports-planet.appspot.com",
  messagingSenderId: "1012081646573",
  appId: "1:1012081646573:web:159391e167a08d84fca5e4",
};

function App() {
  return (
    <div className="App">
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Router>
          <Switch>
            <Route exact path="/">
              <div>Landing</div>
              <a href="/login">Login</a> <br />
              <a href="/registrati">registrati</a>
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/registrati" component={SignUp} />
            <Route exact path="/aggiungiInfo" component={AggiungiInfo} />
            <Route exact path="/me" component={Me} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/addPost" component={Home} />
          </Switch>
        </Router>
      </FirebaseAppProvider>
    </div>
  );
}

export default App;
