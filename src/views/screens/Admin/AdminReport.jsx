import React from "react";
import { Table, Alert } from "reactstrap";
import "./AdminDashboard.css";
import Axios from "axios";
import { connect } from "react-redux";
import { API_URL } from "../../../constants/API";

import ButtonUI from "../../components/Button/Button";

import swal from "sweetalert";

class AdminReport extends React.Component {
  state = {
    transactionList: [],
    usernameList: [],
    productList: [],
  };

  getTransactionList = () => {
    Axios.get(`${API_URL}/transactions`, {
      params: {
        status: "SUDAH DIBAYAR",
        _embed: "transactionsDetail",
      },
    })
      .then((res) => {
        this.setState({ transactionList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getProductList = () => {
    Axios.get(`${API_URL}/products`)
      .then((res) => {
        this.setState({ productList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getUsernameList = () => {
    Axios.get(`${API_URL}/users`)
      .then((res) => {
        console.log(res.data);
        this.setState({ usernameList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.getProductList();
    this.getTransactionList();
    this.getUsernameList();
  };

  showUser = () => {
    return this.state.usernameList.map((val, idx) => {
      let totalUsernameBelanja = 0;
      if (val.role == "user") {
        this.state.transactionList.map((val) => {
          if (val.username == val.username) {
            totalUsernameBelanja += val.totalPrice;
          }
        });
        return (
          <>
            <tr>
              <td>{idx + 1}</td>
              <td>{val.username}</td>
              <td>{totalUsernameBelanja}</td>
            </tr>
          </>
        );
      }
    });
  };

  showProduct = () => {
    return this.state.productList.map((val, idx) => {
      let totalProduct = 0;

      this.state.transactionList.map((value) => {
        value.transactionsDetail.map((value1) => {
          if (val.id == value1.productId) {
            totalProduct += value1.quantity;
          }
        });
      });
      return (
        <>
          <tr>
            <td>{idx + 1}</td>
            <td>{val.productName}</td>
            <td>{totalProduct}</td>
          </tr>
        </>
      );
    });
  };

  render() {
    return (
      <div>
        <h1>Data User</h1>
        <Table>
          <thead>
            <tr>
              <td>no</td>
              <td>Username</td>
              <td>Jumlah Belanja</td>
            </tr>
          </thead>
          <tbody>{this.showUser()}</tbody>
        </Table>
        <br />
        <h1>Data product</h1>
        <Table>
          <thead>
            <tr>
              <td>no</td>
              <td>Product Id</td>
              <td>Jumlah Dibeli</td>
            </tr>
          </thead>
          <tbody>{this.showProduct()}</tbody>
        </Table>
      </div>
    );
  }
}

export default AdminReport;
