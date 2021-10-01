import "./App.css";
import "firebase/firestore";
import "firebase/auth";
import { lazy, Suspense } from "react";

import { FirebaseAppProvider } from "reactfire";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Login = lazy(() => import("./Login/Login"));

const SignUp = lazy(() => import("./Login/SignUp"));

const Me = lazy(() => import("./Me"));

const Success = lazy(() => import("./Success"));

const Home = lazy(() => import("./Home/Home"));

const Help = lazy(() => import("./Help/Help"));

const AggiungiInfo = lazy(() => import("./Login/AggiungiInfo"));

const Chat = lazy(() => import("./Chat"));
const Chats = lazy(() => import("./Chats"));

const Loading = () => <div>Loading...</div>;

const firebaseConfig = {
  apiKey: "AIzaSyCX3rvqwxIOXa7Cr0fMv_Wy9JRhxGWGrBE",
  authDomain: "sports-planet-48b5f.firebaseapp.com",
  projectId: "sports-planet-48b5f",
  storageBucket: "sports-planet-48b5f.appspot.com",
  messagingSenderId: "734555076794",
  appId: "1:734555076794:web:4ba93a22e24f423b62ea83",
  measurementId: "G-ER2Q5HB2QG",
};
function App() {
  return (
      <div className="App">
        <Suspense fallback={<Loading />}>
          <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <Suspense fallback="Loading">
                    <Suspense fallback={<Loading />}>
                      <Login />
                    </Suspense>
                  </Suspense>
                </Route>
                <Route exact path="/login">
                  {" "}
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
                <Route exact path="/help">
                  <Suspense fallback={"Loading help"}>
                    <Help />
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
