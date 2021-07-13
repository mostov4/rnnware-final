import React from "react";

import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { Provider } from "react-redux";
import { fetchProducts } from "./redux/actions/productActions";
import rootReducer from "./redux/reducers/rootReducer";
// import products from "./data/products.json";
import App from "./App";
import "./assets/scss/style.scss";

import * as serviceWorker from "./serviceWorker";
// eslint-disable-next-line
import firebaseData from "./firebase" //used for firebase initialization
import firebase from "firebase"
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  rootReducer,
  load(),
  composeWithDevTools(applyMiddleware(thunk, save()))

);


firebase.database().ref(`/products`).on("value", (res) => {


  let temp = res?.val()?.length ? res.val()?.filter(() => true) : []
  store.dispatch(fetchProducts(temp));

})




// fetch products from json file
// store.dispatch(fetchProducts(products));
// console.log(products, "products offline - local file")
// store.dispatch(productCountryAction(products));





ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
