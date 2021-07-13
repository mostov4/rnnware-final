import PropTypes from "prop-types";
import React, { Fragment } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import firebase from "firebase"
import { useDispatch } from 'react-redux';
import { userDetailsAction } from "../../redux/actions/userDetails";
import { useHistory } from "react-router-dom";
require('firebase/auth')



const LoginRegister = ({ location }) => {
  let dispatch = useDispatch()
  const [userName, setUserName] = React.useState("")
  const [userEmail, setUserEmail] = React.useState("")
  const [userPassword, setUserPassword] = React.useState("")
  const [error, setError] = React.useState(null)
  const [loginError, setLoginError] = React.useState(null)
  let history = useHistory();

  const LoginFunc = () => {
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
      .then((res) => {
        dispatch(userDetailsAction(res?.user))
        if (userEmail !== "admin@rnn-ware.com" || userEmail !== "" || userEmail !== null || userEmail !== undefined) return history.push("/")
        else return history.push("/retailerproductlist")
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          // alert('Wrong password.');
          setLoginError('Wrong password.')
        } else {
          setLoginError(errorMessage)
          // alert(errorMessage);
        }
        console.log(error, "error");
        // [END_EXCLUDE]
      });
  }
  const submit = (e) => {
    e.preventDefault()
  }
  const SignupFunc = (e) => {
    e.preventDefault(e)
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((res) => {
      let UID = res.user.uid
      firebase.database().ref('Users/' + UID).set({
        userEmail: userEmail,
        userName: userName
      })

      history.push("/")

    }).catch(function (error) { 
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, "error code" + errorMessage, "error message")
      setError(errorMessage)
      // ...
    });
    setError("")
  }
  return (
    <Fragment>
      <title>RNN-Ware | Login</title>


      <LayoutOne headerTop="visible">

        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={((e) => submit(e))}>
                              <input
                                type="text"
                                placeholder="Username"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                required={true}
                              />
                              <input
                                type="password"
                                placeholder="Password"
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                                required={true}

                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <span > &nbsp;&nbsp; Forgot Password?</span>
                                </div>
                                {userEmail.length && userPassword.length && loginError ? <span style={{ color: "red" }}>{loginError}<br /></span> : null}
                                <button type="submit" onClick={LoginFunc}>
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form >
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Username"
                                onChange={(e) => setUserName(e.target.value)}
                                required={true}
                              />
                              <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setUserPassword(e.target.value)}
                                required={true}

                              />
                              <input
                                placeholder="Email"
                                type="email"
                                onChange={(e) => setUserEmail(e.target.value)}
                                required={true}
                              />
                              <div className="button-box">
                                <button type="submit" onClick={((e) => SignupFunc(e))}>
                                  <span>Register</span>
                                </button>
                              </div>
                              {userName.length && userEmail.length && userPassword.length && error ? <span style={{ color: "red" }}>{error}</span> : null}
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object
};

export default LoginRegister;
