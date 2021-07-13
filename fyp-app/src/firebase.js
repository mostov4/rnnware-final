import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyB0p7NpgI3UafQZBDdV2thvKpE4Vs7UXRo",
  authDomain: "rnn-ware.firebaseapp.com",
  projectId: "rnn-ware",
  storageBucket: "rnn-ware.appspot.com",
  messagingSenderId: "808868665508",
  appId: "1:808868665508:web:28246d532f11d5124bae31",
  measurementId: "G-3QBY44W09V"
};

// var firebaseConfig = {
//   apiKey: "AIzaSyBOz_GBA4jqIcxHyXkPvBTaam78j6MRqcs",
//   authDomain: "fyp-recommendation-syste-893ec.firebaseapp.com",
//   databaseURL: "https://fyp-recommendation-syste-893ec-default-rtdb.firebaseio.com",
//   projectId: "fyp-recommendation-syste-893ec",
//   storageBucket: "fyp-recommendation-syste-893ec.appspot.com",
//   messagingSenderId: "648326074348",
//   appId: "1:648326074348:web:5a43b5d74b6f0666b63ac9"
// };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);