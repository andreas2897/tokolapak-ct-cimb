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

const cookieObj = new Cookie();

class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      let cookieResult = cookieObj.get("authData", { path: "/" });
      if (cookieResult) {
        this.props.keepLogin(cookieResult);
      } else {
        this.props.cookieChecker();
      }
    }, 2000);
  }

  renderAdminRoutes = () => {
    if (this.props.user.role === "admin") {
      return (
        <>
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/admin/member" component={AdminMember} />
          <Route exact path="/admin/payment" component={AdminPayment} />
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
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/history" component={History} />
            {this.renderAdminRoutes()}
            <Route exact path="*" component={PageNotFound} />
            {/* <Route path="*" component={} /> */}
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
 *    -> lalu cart harus kosong (done)
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
