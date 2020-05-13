import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Cookie from "universal-cookie";
import { connect } from "react-redux";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./views/screens/Home/Home";
import Navbar from "./views/components/Navbar/Navbar";
import AuthScreen from "./views/screens/Auth/AuthScreen";
import ProductDetails from "./views/screens/ProductDetails/ProductDetails";
import Cart from "./views/screens/Cart/Cart";
import AdminDashboard from "./views/screens/Admin/AdminDashboard";
import AdminMember from "./views/screens/Admin/AdminMember";
import AdminPayment from "./views/screens/Admin/AdminPayment";
import History from "./views/screens/History/HistoryTransaction";
import PageNotFound from "./views/screens/PageNotFound";
import { userKeepLogin, cookieChecker } from "./redux/actions";
<<<<<<< HEAD
import AdminReport from "./views/screens/Admin/AdminReport";
=======
import Payments from "./views/screens/Admin/Payments";
import PageNotFound from "./views/screens/PageNotFound";
import History from "./views/screens/History/History";
import Report from "./views/screens/Admin/Report";
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb

const cookieObj = new Cookie();

class App extends React.Component {
  componentDidMount() {
<<<<<<< HEAD
    setTimeout(() => {
      let cookieResult = cookieObj.get("authData", { path: "/" });
      if (cookieResult) {
        this.props.keepLogin(cookieResult);
      } else {
        this.props.cookieChecker();
      }
    }, 2000);
=======
    let cookieResult = cookieObj.get("authData", { path: "/" });
    if (cookieResult) {
      this.props.keepLogin(cookieResult);
    } else {
      this.props.cookieChecker();
    }
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb
  }

  renderAdminRoutes = () => {
    if (this.props.user.role === "admin") {
      return (
        <>
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
<<<<<<< HEAD
          <Route exact path="/admin/member" component={AdminMember} />
          <Route exact path="/admin/payment" component={AdminPayment} />
          <Route exact path="/admin/report" component={AdminReport} />
=======
          <Route exact path="/admin/payments" component={Payments} />
          <Route exact path="/admin/report" component={Report} />
        </>
      );
    }
  };

  renderProtectedRoutes = () => {
    if (this.props.user.id) {
      return (
        <>
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/history" component={History} />
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb
        </>
      );
    }
  };

  render() {
    if (this.props.user.cookieChecked) {
      return (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={AuthScreen} />
            <Route
              exact
              path="/product/:productId"
              component={ProductDetails}
            />
<<<<<<< HEAD
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/history" component={History} />

            {this.renderAdminRoutes()}
            <Route exact path="*" component={PageNotFound} />
            {/* <Route path="*" component={} /> */}
=======
            {this.renderAdminRoutes()}
            {this.renderProtectedRoutes()}
            <Route path="*" component={PageNotFound} />
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb
          </Switch>
          <div style={{ height: "120px" }} />
        </>
      );
    } else {
      return <div>Loading ...</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  keepLogin: userKeepLogin,
  cookieChecker,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

/**
 * PR
 * 1. Add to cart, jika barang double, qty yg akan bertambah (done)
 * 2. Di Home, ketika click PHONE/LAPTOP/TAB/DESKTOP (done)
 * 3. Di navbar, ketika ketik, secara otomatis filter products (done)
 * 4. Di cart, buat button checkout, serta dengan proses checkout (done)
 * 5. Ketika confirm checkout, lakukan POST request ke db.json ke transaction
<<<<<<< HEAD
 *    -> lalu cart harus kosong (done)
=======
 *    -> lalu cart harus kosong
 *
 * TRANSACTIONS
 * userId
 * total price
 * status -> "pending"
 * tanggal belanja
 * tanggal selesai -> ""
 *
 * TRANSACTION_DETAILS
 * transactionId
 * productId
 * price
 * quantity
 * totalPrice (price * quantity)
 *
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb
 */

// * TRANSACTIONS
// * userId
// * total belanja
// * status -> "pending"
// * tanggal belanja
// * tanggal selesai -> ""
// *
// * TRANSACTION_DETAILS
// * transactionId
// * productId
// * price
// * quantity
// * totalPrice (price * quantity)

// buat besok :
// admin Payment
