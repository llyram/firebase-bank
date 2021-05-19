import React, { useRef, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route , Redirect} from "react-router-dom";


// importing components
import Header from "./components/Header";
import Home from "./components/Home";
import Customers from "./components/Customers";
import Transact from "./components/Transact";
import History from "./components/History";

import firebase from "firebase/app";
import "firebase/firestore";
// import Transact from "./components/Transact";
// import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAkM_4WiLlUdAJs-lDCfcsqrLKxaiCq3U4",
  authDomain: "fir-bank-c280b.firebaseapp.com",
  projectId: "fir-bank-c280b",
  storageBucket: "fir-bank-c280b.appspot.com",
  messagingSenderId: "399906720600",
  appId: "1:399906720600:web:118822db2e2f24a975b32d",
  measurementId: "G-GZF77Q02JT",
});

const firestore = firebase.firestore();

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/customers" render={(props) => <Customers {...props} firestore={firestore} />} />
        <Route path="/transact" render={(props) => <Transact {...props} firestore={firestore} />} />
        <Route path="/history" render={(props) => <History {...props} firestore={firestore} />} />
      </div>
    </Router>
  );
}

export default App;
