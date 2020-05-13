import React from "react";
import { connect } from "react-redux";
import "./Cart.css";
<<<<<<< HEAD
=======

import { Table, Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import { Table, Alert } from "reactstrap";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import TextField from "../../components/TextField/TextField";
import swal from "sweetalert";
=======
import { priceFormatter } from "../../../supports/helpers/formatter";
import { fillCart } from "../../../redux/actions";
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb

class Cart extends React.Component {
  state = {
    cartData: [],
<<<<<<< HEAD
    checkOutItem: [],
    kondisiTransaksi: false,
    ongkir: 0,
    totalPrice: 0,
=======
    checkoutItems: [],
    shipping: "instant",
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb
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

<<<<<<< HEAD
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
=======
  checkboxHandler = (e, idx) => {
    const { checked } = e.target;

    if (checked) {
      this.setState({ checkoutItems: [...this.state.checkoutItems, idx] });
    } else {
      this.setState({
        checkoutItems: [
          ...this.state.checkoutItems.filter((val) => val !== idx),
        ],
      });
    }
  };

  renderCartData = () => {
    return this.state.cartData.map((val, idx) => {
      const { quantity, product, id } = val;
      const { productName, image, price, category } = product;
      return (
        <tr
          style={{
            height: "150px",
          }}
        >
          <td className="text-left">
            <div className="d-flex align-items-center">
              <img
                className="mr-4"
                src={image}
                alt=""
                style={{
                  width: "100px",
                  height: "150px",
                  objectFit: "contain",
                }}
              />
              <div>
                <strong>{productName}</strong>
                <p>{category}</p>
              </div>
            </div>
          </td>
          <td style={{ verticalAlign: "middle" }}>
            <strong>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price)}
            </strong>
          </td>
          <td style={{ verticalAlign: "middle" }}>
            <strong>{quantity}</strong>
          </td>
          <td>
            <strong>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price * quantity)}
            </strong>
          </td>
          <td>
            <FontAwesomeIcon
              onClick={() => this.deleteCartHandler(id)}
              className="close-icon"
              icon={faTimesCircle}
              style={{ fontSize: "30px", color: "gray" }}
            />
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb
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
<<<<<<< HEAD
        Axios.delete(`${API_URL}/carts/${id}`)
          .then((res) => {
            console.log(res.data);
            alert("sudah terhapus");
            this.addCart();
          })
          .catch((err) => {
            console.log(err);
          });
=======
        this.getCartData();
        this.props.fillCart(this.props.user.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderSubTotalPrice = () => {
    let totalPrice = 0;

    this.state.cartData.forEach((val) => {
      const { quantity, product } = val;
      const { price } = product;

      totalPrice += quantity * price;
    });

    return totalPrice;
  };

  renderShippingPrice = () => {
    switch (this.state.shipping) {
      case "instant":
        return priceFormatter(100000);
      case "sameDay":
        return priceFormatter(50000);
      case "express":
        return priceFormatter(20000);
      default:
        return "Free";
    }
  };

  renderTotalPrice = () => {
    let totalPrice = 0;

    this.state.cartData.forEach((val) => {
      const { quantity, product } = val;
      const { price } = product;

      totalPrice += quantity * price;
    });

    let shippingPrice = 0;

    switch (this.state.shipping) {
      case "instant":
        shippingPrice = 100000;
        break;
      case "sameDay":
        shippingPrice = 50000;
        break;
      case "express":
        shippingPrice = 20000;
        break;
      default:
        shippingPrice = 0;
        break;
    }

    return totalPrice + shippingPrice;
  };

  checkoutHandler = () => {
    let date = new Date();
    Axios.post(`${API_URL}/transactions`, {
      userId: this.props.user.id,
      totalPrice: this.renderTotalPrice(),
      status: "pending",
      checkoutDate: date.getTime(),
      completedDate: "",
    })
      .then((res) => {
        this.state.cartData.forEach((val) => {
          const { quantity, product } = val;
          const { price, id } = product;

          Axios.post(`${API_URL}/transactionDetails`, {
            transactionId: res.data.id,
            productId: id,
            price,
            quantity,
            totalPrice: price * quantity,
          })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log("ERROR POST TRANSACTION DETAILS");
            });
        });
      })
      .then((res) => {
        this.state.cartData.forEach((val) => {
          this.deleteCartHandler(val.id);
        });
      })
      .then((res) => {
        this.props.fillCart(this.props.user.id);
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb
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
<<<<<<< HEAD
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
=======
    if (this.state.cartData.length) {
      return (
        <div className="py-4" style={{ padding: "0px 240px" }}>
          <div className="row">
            <div className="col-8">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th className="text-left">Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{this.renderCartData()}</tbody>
              </table>
            </div>
            <div className="col-4">
              <div className="cart-card">
                <div className="cart-card-head p-4">Order Summary</div>
                <div className="cart-card-body p-4">
                  <div className="d-flex justify-content-between my-2">
                    <div>Subtotal</div>
                    <strong>
                      {priceFormatter(this.renderSubTotalPrice())}
                    </strong>
                  </div>
                  <div className="d-flex justify-content-between my-2">
                    <div>Shipping</div>
                    <strong>{this.renderShippingPrice()}</strong>
                  </div>
                  <div className="d-flex justify-content-between my-2 align-items-center">
                    <label>Shipping Method</label>
                    <select
                      onChange={(e) =>
                        this.setState({ shipping: e.target.value })
                      }
                      className="form-control w-50"
                    >
                      <option value="instant">Instant</option>
                      <option value="sameDay">Same Day</option>
                      <option value="express">Express</option>
                      <option value="economy">Economy</option>
                    </select>
                  </div>
                </div>
                <div className="cart-card-foot p-4">
                  <div className="d-flex justify-content-between my-2">
                    <div>Total</div>
                    <div>{priceFormatter(this.renderTotalPrice())}</div>
                  </div>
                </div>
              </div>
              <input
                onClick={this.checkoutHandler}
                type="button"
                value="Checkout"
                className="btn btn-success btn-block mt-3"
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container py-4">
          <div className="row">
            <div className="col-12">
              <div className="alert alert-info">Shopping Cart Empty</div>
            </div>
          </div>
        </div>
      );
    }
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
<<<<<<< HEAD
export default connect(mapStateToProps)(Cart);
=======

const mapDispatchToProps = {
  fillCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb
