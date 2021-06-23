import "./App.css";

import { lazy, Suspense } from "react";

import { FirebaseAppProvider } from "reactfire";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Login = lazy(() => import("./Login/Login"));

const SignUp = lazy(() => import("./Login/SignUp"));

const Me = lazy(() => import("./Me"));

const Success = lazy(() => import("./Success"));

const Home = lazy(() => import("./Home/Home"));

const AggiungiInfo = lazy(() => import("./Login/AggiungiInfo"));

const Chat = lazy(() => import("./Chat"));
const Chats = lazy(() => import("./Chats"));

const Loading = () => <div>Loading...</div>;

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
      <Suspense fallback={<Loading />}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <Router>
            <Switch>
              <Route exact path="/">
                <div>Landing</div>
                <a href="/login">Login</a> <br />
                <a href="/registrati">registrati</a>
              </Route>
              <Route exact path="/login">
                <Suspense fallback={<Loading />}>
                  <Login />
                </Suspense>
              </Route>
              <Route exact path="/registrati">
                <Suspense fallback={<Loading />}>
                  <SignUp />
                </Suspense>
              </Route>
              <Route exact path="/aggiungiInfo">
                <Suspense fallback={<Loading />}>
                  <AggiungiInfo />
                </Suspense>
              </Route>
              <Route exact path="/me">
                <Suspense fallback={"Loading me"}>
                  <Me />
                </Suspense>
              </Route>
              <Route exact path="/user/:id" component={Me}>
                <Suspense fallback={<Loading />}>
                  <Me />
                </Suspense>
              </Route>
              <Route exact path="/success" component={Success} />
              <Route exact path="/home">
                <Suspense fallback={"Loading home"}>
                  <Home />
                </Suspense>
              </Route>
              <Route exact path="/chats" component={Chats} />
              <Route exact path="/chat/:id" component={Chat} />
              <Route path="*">404</Route>
            </Switch>
          </Router>
        </FirebaseAppProvider>
      </Suspense>
    </div>
  );
}

export default App;
