import React from "react";
import TextField from "../../components/TextField/TextField";
import ButtonUI from "../../components/Button/Button";
import { connect } from "react-redux";
import {
  loginHandler,
  registerHandler,
  switchLoginRegister,
} from "../../../redux/actions";

class AuthScreen extends React.Component {
  state = {
    username: "",
    password: "",
  };
  loginHandler = () => {
    const { username, password } = this.state;

    const userData = {
      username,
      password,
    };

    this.props.onlogin(userData);
    // alert("masuk")
  };

  registerHandler = () => {
    const { username, email, password } = this.state;
    const userData = { username, email, password };
    this.props.onRegis(userData);
  };

  renderLoginForm = () => {
    return (
      <div>
        <h3>Log In</h3>
        <p className="mt-4">
          Welcome back.
          <br /> Please, login to your account
        </p>
        <TextField
          placeholder="Username"
          className="mt-5"
          onChange={(e) => this.setState({ username: e.target.value })}
        />
        <TextField
          placeholder="Password"
          className="mt-2"
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <div className="d-flex justify-content-center">
          <ButtonUI
            type="contained"
            className="mt-4"
            onClick={this.loginHandler}
          >
            Login
          </ButtonUI>
        </div>
      </div>
    );
  };

  renderRegistrationForm = () => {
  return (
    <div>
      <h3>Register</h3>
      <p className="mt-4">You will get best price for your electronic</p>
      <TextField
        placeholder="Username"
        className="mt-5"
        onChange={(e) => this.setState({ username: e.target.value })}
      />
      <TextField
        placeholder="Email"
        className="mt-2"
        onChange={(e) => this.setState({ email: e.target.value })}
      />
      <TextField
        placeholder="Password"
        className="mt-2"
        onChange={(e) => this.setState({ password: e.target.value })}
      />
      <TextField
        placeholder="Confirm password"
        className="mt-2"
        onChange={(e) => this.setState({ password: e.target.value })}
      />
      <div className="d-flex justify-content-center">
        <ButtonUI
          type="contained"
          className="mt-4"
          onClick={this.registerHandler}
        >
          Register
        </ButtonUI>
      </div>
    </div>
  )
  };

  render() {
    const { option } = this.props.user;
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-5">
            <div className="d-flex mb-3">
              <ButtonUI
                onClick={() => {
                  this.props.switchLoginRegister("register");
                }}
                type="outlined"
                className="mr-3"
              >
                Register
              </ButtonUI>
              <ButtonUI
                type="outlined"
                onClick={() => {
                  this.props.switchLoginRegister("login");
                }}
              >
                Login
              </ButtonUI>
            </div>         
          {option == "signin"
            ? this.renderLoginForm()
            : this.renderRegistrationForm()}
        </div>
        <div className="col-7">Picture</div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  onlogin: loginHandler,
  onRegis: registerHandler,
  switchLoginRegister,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
// export default AuthScreen;
