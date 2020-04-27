import React from "react";
import TextField from "../../components/TextField/TextField";
<<<<<<< HEAD
=======
import ButtonUI from "../../components/Button/Button";
>>>>>>> b3d57fa4d4c7075e9d991868afaa7eaced7bd92e

class AuthScreen extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-5">
            <div>
              <h3>Log In</h3>
              <p className="mt-4">
<<<<<<< HEAD
                Welcome back, <br />
                please, login to your account
              </p>
              <TextField placeholder="username" className="mt-5" />
              <TextField placeholder="password" className="mt-2" />
=======
                Welcome back.
                <br /> Please, login to your account
              </p>
              <TextField placeholder="Username" className="mt-5" />
              <TextField placeholder="Password" className="mt-2" />
>>>>>>> b3d57fa4d4c7075e9d991868afaa7eaced7bd92e
              <div className="d-flex justify-content-center">
                <ButtonUI type="contained" className="mt-4">
                  Login
                </ButtonUI>
              </div>
            </div>
          </div>
<<<<<<< HEAD
          <div className="col-7">picture</div>
=======
          <div className="col-7">Picture</div>
>>>>>>> b3d57fa4d4c7075e9d991868afaa7eaced7bd92e
        </div>
      </div>
    );
  }
}

export default AuthScreen;
