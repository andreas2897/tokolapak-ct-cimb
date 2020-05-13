import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import { faUser } from "@fortawesome/free-regular-svg-icons";

import "./Navbar.css";
import ButtonUI from "../Button/Button";
<<<<<<< HEAD
import { logoutHandler, searchProduct } from "../../../redux/actions";
import Cookie from "universal-cookie";
import Axios from "axios";
import { API_URL } from "../../../constants/API";

const cookieObject = new Cookie();
=======
import { logoutHandler, navbarInputHandler } from "../../../redux/actions";
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb

const CircleBg = ({ children }) => {
  return <div className="circle-bg">{children}</div>;
};

class Navbar extends React.Component {
  state = {
    searchBarIsFocused: false,
    searcBarInput: "",
    dropdownOpen: false,
    cartCount: 0,
  };

  onFocus = () => {
    this.setState({ searchBarIsFocused: true });
  };

  onBlur = () => {
    this.setState({ searchBarIsFocused: false });
  };

  logoutBtnHandler = () => {
    cookieObject.remove("authData");
    this.props.onLogout();
    // this.forceUpdate();
  };

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  cartCountHandler = () => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({ cartCount: res.data.length });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // componentDidUpdate() {
  //   this.cartCountHandler();
  // }

  componentDidMount() {
    this.cartCountHandler();
  }

  render() {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center py-4 navbar-container">
        <div className="logo-text">
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            LOGO
          </Link>
        </div>
        <div
          style={{ flex: 1 }}
          className="px-5 d-flex flex-row justify-content-start"
        >
          <input
            onChange={this.props.onChangeSearch}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            className={`search-bar ${
              this.state.searchBarIsFocused ? "active" : null
            }`}
            type="text"
            placeholder="Cari produk impianmu disini"
            onChange={(e) => {
              this.props.searchProduct(e.target.value);
            }}
          />
        </div>
        <div className="d-flex flex-row align-items-center">
          {this.props.user.id ? (
            <>
              <Dropdown
                toggle={this.toggleDropdown}
                isOpen={this.state.dropdownOpen}
              >
                <DropdownToggle tag="div" className="d-flex">
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
                  <p className="small ml-3 mr-4">{this.props.user.username}</p>
                </DropdownToggle>
<<<<<<< HEAD
                {this.props.user.role == "admin" ? (
                  <DropdownMenu className="mt-2">
                    <DropdownItem>
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to="/admin/dashboard"
                      >
                        Dashboard
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to="/admin/member"
                      >
                        Members
                      </Link>
                    </DropdownItem>
                    <DropdownItem>Payments</DropdownItem>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu className="mt-2">
                    <DropdownItem>
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to="/admin/dashboard"
                      >
                        Wishlist
                      </Link>
                    </DropdownItem>
                    <DropdownItem>History</DropdownItem>
                  </DropdownMenu>
                )}
=======
                <DropdownMenu className="mt-2">
                  {this.props.user.role == "admin" ? (
                    <>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/admin/dashboard"
                        >
                          Dashboard
                        </Link>
                      </DropdownItem>
                      <DropdownItem>Members</DropdownItem>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/admin/payments"
                        >
                          Payments
                        </Link>
                      </DropdownItem>
                    </>
                  ) : (
                    <>
                      <DropdownItem>Wishlist</DropdownItem>
                      <DropdownItem>
                        <Link to="/history">History</Link>
                      </DropdownItem>
                    </>
                  )}
                </DropdownMenu>
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb
              </Dropdown>
              <Link
                className="d-flex flex-row"
                to="/cart"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faShoppingCart}
                  style={{ fontSize: 24 }}
                />
                <CircleBg>
                  <small style={{ color: "#3C64B1", fontWeight: "bold" }}>
<<<<<<< HEAD
                    {this.state.cartCount}
=======
                    {this.props.user.cartItems}
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb
                  </small>
                </CircleBg>
              </Link>
              <ButtonUI
                onClick={this.logoutBtnHandler}
                className="ml-3"
                type="textual"
              >
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/"
                ></Link>
                Logout
              </ButtonUI>
            </>
          ) : (
            <>
              <ButtonUI className="mr-3" type="textual">
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/auth"
                >
                  Sign in
                </Link>
              </ButtonUI>
              <ButtonUI type="contained">
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/auth"
                >
                  Sign up
                </Link>
              </ButtonUI>
            </>
          )}
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
  onLogout: logoutHandler,
<<<<<<< HEAD
  searchProduct,
=======
  onChangeSearch: navbarInputHandler,
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
