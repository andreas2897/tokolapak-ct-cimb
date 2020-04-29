import React from "react";
import { connect } from "react-redux";
import "./Cart.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";

class Cart extends React.Component {
  state = {
    dataCart: [],
  };

  componentDidMount() {
    

    // Axios.get(`${API_URL}/products/1`, {
    //   params: {
    //     _embed: "carts",
    //   },
    // })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    this.renderData()
  }

  renderData = () => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {
        this.setState({ dataCart: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderTable = () => {
    return this.state.dataCart.map((val, idx) => {
      return (
        <tr key={`dataCart-${val.product.id}`}>
          <th>{idx + 1}</th>
          <th>{val.product.productName}</th>
          <th>{val.product.price}</th>
          <th>{val.product.category}</th>
          <th>{val.product.desc}</th>
          <th>
            <img src={val.product.image} width="80" />
          </th>
          <th>
            <ButtonUI
              onClick={() => this.deleteCart(val.id)}
              style={{ backgroundColor: "red" }}
            >
              Delete
            </ButtonUI>
          </th>
        </tr>
      );
    });
  };

  deleteCart = (idx) => {
    Axios.delete(`${API_URL}/carts/${idx}`)
      .then((res) => {
        console.log(res.data);
        alert("sudah terhapus")
        this.renderData()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container">
        <table className="table ">
          <thead>
            <tr>
              <th>No.</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Desc</th>
              <th>Image</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </table>
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
