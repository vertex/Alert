/* @flow */
import "./scss/app.scss";
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyDqXCPkdJxLwx8jBGaJYxRQ7eOLx7N0Fhk",
  authDomain: "project-6329594795012513265.firebaseapp.com",
  databaseURL: "https://project-6329594795012513265.firebaseio.com",
  storageBucket: "gs://project-6329594795012513265.appspot.com"
};
firebase.initializeApp(config);
console.log(firebase.auth());
