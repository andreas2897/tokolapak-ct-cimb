import React from "react";
import { connect } from "react-redux";
import "./Cart.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import { Table, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import TextField from "../../components/TextField/TextField";
import swal from "sweetalert";

class Cart extends React.Component {
  state = {
    cartData: [],
    checkOutItem: [],
    kondisiTransaksi: false,
    ongkir: 0,
    totalPrice: 0,
  };
  componentDidMount() {
    this.addCart();
  }

  addCart = () => {
    let hargaTotal = 0;
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {
        this.setState({ cartData: res.data });
        console.log(this.state.cartData);
        this.state.cartData.map((val) => {
          hargaTotal += val.quantity * val.product.price;
        });
        this.setState({
          totalPrice: hargaTotal,
        });
      })
      .catch((err) => {
        alert("error");
        console.log(err);
      });
  };

  renderCart = () => {
    return this.state.cartData.map((val, idx) => {
      const { quantity, product, id } = val;
      const { productName, price, image } = product;
      return (
        <tr key={`cartData-${id}`}>
          <td>{idx + 1}</td>
          <td>{productName}</td>
          <td>
            {" "}
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
            <input
              type="checkbox"
              className="form-control"
              onChange={(e) => this.checkboxHandler(e, idx)}
            />
          </td>
          <td>
            <ButtonUI
              onClick={() => this.deleteCart(id)}
              style={{ backgroundColor: "red" }}
            >
              Delete
            </ButtonUI>
          </td>
        </tr>
      );
    });
  };

  transaksiCart = () => {
    // alert(this.state.ongkir);
    this.setState({
      kondisiTransaksi: true,
      // totalPrice: +this.state.ongkir,
    });
  };

  inputHandler = (e, field) => {
    let { value } = e.target;
    this.setState({
      [field]: value,
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

  confirmTransaksi = () => {
    const { totalPrice, cartData } = this.state;
    this.state.cartData.map((val) => {
      Axios.post(`${API_URL}/transactions`, {
        userId: this.props.user.id,
        totalPrice: val.product.price * val.quantity + +this.state.ongkir,
        status: "pending",
      })
        .then((res) => {
          alert(this.state.totalPrice);
          this.state.cartData.map((val) => {
            Axios.post(`${API_URL}/transactionsDetail`, {
              productId: val.product.id,
              price: val.product.price,
              totalPrice: val.product.price * val.quantity + +this.state.ongkir,
              quantity: val.quantity,
              transactionId: res.data.id,
            })
              .then((res) => {
                console.log(res);
                this.state.cartData.map((val) => {
                  Axios.delete(`${API_URL}/carts/${val.id}`)
                    .then((res) => {
                      console.log(res);
                      swal(
                        "success",
                        "Your transaction has been completed",
                        "success"
                      );
                      this.addCart();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  deleteCart = (id) => {
    Axios.get(`${API_URL}/carts/${id}`)
      .then((res) => {
        Axios.delete(`${API_URL}/carts/${id}`)
          .then((res) => {
            console.log(res.data);
            alert("sudah terhapus");
            this.addCart();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  checkboxHandler = (e, idx) => {
    const { checked } = e.target;
    if (checked) {
      this.setState({ checkOutItem: [...this.state.checkOutItem, idx] });
    } else {
      this.setState({
        checkOutItem: [...this.state.checkOutItem.filter((val) => val !== idx)],
      });
    }
  };

  render() {
    return (
      <div className="container py-4">
        {this.state.cartData.length > 0 ? (
          <>
            <Table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.renderCart()}</tbody>
            </Table>
            <div className="col-12 mt-3">
              <select
                value={this.state.ongkir}
                className="custom-text-input h-100 pl-3"
                onChange={(e) => this.inputHandler(e, "ongkir")}
              >
                <option value="0">Economy</option>
                <option value="100000">instant</option>
                <option value="50000">Sameday</option>
                <option value="20000">Express</option>
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <ButtonUI onClick={this.transaksiCart}>Transaction</ButtonUI>
            </div>
            {!this.state.kondisiTransaksi ? null : (
              <>
                <h4>Konfirmasi Total Pembelian Anda</h4>
                <Table style={{ marginTop: "10px" }}>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Image</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderTraksaksi()}</tbody>
                </Table>
                <div className="d-flex flex-column">
                  <center>
                    <ButtonUI onClick={this.confirmTransaksi} type="outlined">
                      Confirm
                    </ButtonUI>
                  </center>
                </div>
              </>
            )}
          </>
        ) : (
          <Alert>
            Your Cart is Empty!<Link to="/">Go Shopping</Link>
          </Alert>
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
export default connect(mapStateToProps)(Cart);
