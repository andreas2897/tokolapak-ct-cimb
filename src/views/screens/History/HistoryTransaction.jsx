import React from "react";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import swal from "sweetalert";
import { connect } from "react-redux";

class HistoryTransaction extends React.Component {
  state = {
    productList: [],
    datePayment: new Date(),
    activeProducts: [],
    kondisiTransaksi: false,
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
        this.setState({ productList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  detailHandler = (id) => {};

  componentDidMount() {
    this.getPaymentList();
  }

  renderPaymentList = () => {
    return this.state.productList.map((val, idx) => {
      const { id, totalPrice, status } = val;
      return (
        <>
          <tr>
            <td>{idx + 1}</td>
            <td> {id} </td>
            <td> {status} </td>
            <td>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(totalPrice)}{" "}
            </td>
            <td>
              <ButtonUI
                onClick={(_) => this.detailHandler(id)}
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
                <th>Status</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderPaymentList()}</tbody>
          </table>
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
export default connect(mapStateToProps)(HistoryTransaction);
