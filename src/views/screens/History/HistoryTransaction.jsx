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
  // paymentBtnHandler = (idx) => {
  //   this.setState({
  //     editForm: {
  //       ...this.state.productList[idx],
  //     },
  //   });
  // };
  confirmPaymentHandler = (id) => {
    // Axios.put(
    //   `${API_URL}/transactions/${this.state.editForm.id}`,
    //   this.state.editForm
    // )
    console.log(id);
    Axios.patch(`${API_URL}/transactions/${id}`, {
      status: "SUDAH DIBAYAR",
      dateDone: this.state.datePayment.toLocaleDateString(),
    })
      .then((res) => {
        swal("Success!", "Your item has been edited", "success");
        this.getPaymentList();
      })
      .catch((err) => {
        swal("Error!", "Your item could not be edited", "error");
        console.log(err);
      });
  };
  componentDidMount() {
    this.getPaymentList();
  }

  transaksiCart = () => {
    this.setState({
      kondisiTransaksi: true,
    });
  };

  renderTraksaksi = () => {
    return this.state.cartData.map((val, idx) => {
      const { quantity, product, id } = val;
      const { productName, price, image } = product;
      return (
        <tr key={`cartData-${id}`}>
          <td>{idx + 1}</td>
          <td>{productName}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price)}
          </td>
          <td>{quantity}</td>
          <td>
            <img src={image} width="80" />
          </td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(quantity * price + +this.state.ongkir)}
          </td>
        </tr>
      );
    });
  };

  renderPaymentList = () => {
    return this.state.productList.map((val, idx) => {
      const { id, totalPrice, status, transactionDate, dateDone } = val;
      return (
        <>
          <tr
          // onClick={() => {
          //   if (this.state.includes(idx)) {
          //     this.setState({
          //       activeProducts: [
          //         ...this.state.filter((item) => item !== idx),
          //       ],
          //     });
          //   } else {
          //     this.setState({
          //       activeProducts: [...this.state, idx],
          //     });
          //   }
          // }}
          >
            <td>{idx + 1}</td>
            <td> {id} </td>

            <td> {status} </td>

            <td>
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(totalPrice)}{" "}
            </td>
            <td>
              <ButtonUI
                onClick={(_) => this.confirmPaymentHandler(id)}
                type="contained"
              >
                Confirm Payment
              </ButtonUI>
            </td>
          </tr>
          <tr
          // className={`collapse-item ${
          //   this.state.includes(idx) ? "active" : null
          // }`}
          >
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
            <h2>TRANSACTIONS</h2>
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
