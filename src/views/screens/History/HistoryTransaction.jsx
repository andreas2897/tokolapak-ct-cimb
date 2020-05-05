import React from "react";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import swal from "sweetalert";
import { connect } from "react-redux";
import { Table, Alert } from "reactstrap";

class HistoryTransaction extends React.Component {
  state = {
    productList: [],
    dataList: [],
    datePayment: new Date(),
    windowDetail: false,
  };

  getPaymentList = () => {
    Axios.get(`${API_URL}/transactions`, {
      params: {
        userId: this.props.user.id,
        status: "SUDAH DIBAYAR",
        _embed: "transactionsDetail",
      },
    })
      .then((res) => {
        this.setState({ dataList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  detailHandler = (id) => {
    const { transactionsDetail } = this.state.dataList[id];
    this.setState({ productList: transactionsDetail });
    this.setState({ windowDetail: true });
  };

  componentDidMount() {
    this.getPaymentList();
  }

  renderPaymentList = () => {
    return this.state.dataList.map((val, idx) => {
      const { id, totalPrice, status } = val;
      return (
        <>
          <tr>
            <td>{idx + 1}</td>
            <td> {id} </td>
            <td>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(totalPrice)}{" "}
            </td>
            <td> {status} </td>
            <td>
              <ButtonUI
                onClick={(_) => this.detailHandler(idx)}
                type="contained"
              >
                Details
              </ButtonUI>
            </td>
          </tr>
          <tr>
            <div className="d-flex flex-column align-items-center"></div>
          </tr>
        </>
      );
    });
  };

  renderDetail = () => {
    return this.state.productList.map((val, idx) => {
      return (
        <tr>
          <td>{idx + 1}</td>
          <td>{val.id}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(val.price)}{" "}
          </td>
          <td>{val.quantity}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(val.totalPrice)}{" "}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container py-4">
        <div className="dashboard">
          <caption className="p-3">
            <h2>History</h2>
          </caption>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderPaymentList()}</tbody>
          </table>
        </div>
        {!this.state.windowDetail ? null : (
          <>
            <h4>Detail History</h4>
            <Table style={{ marginTop: "10px" }}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>{this.renderDetail()}</tbody>
            </Table>
          </>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(HistoryTransaction);
