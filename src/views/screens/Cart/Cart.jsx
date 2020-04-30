import React from "react";
import { connect } from "react-redux";
import "./Cart.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import { Table, Alert } from "reactstrap";

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
    this.renderData();
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
  };

  renderTable = () => {
    return this.state.dataCart.map((val, idx) => {
      return (
        <tr key={`dataCart-${val.product.id}`}>
          <td>{idx + 1}</td>
          <td>{val.product.productName}</td>
          <td>{val.product.price}</td>
          <td>{val.product.category}</td>
          <td>{val.product.desc}</td>
          <td>
            <img src={val.product.image} width="80" />
          </td>
          <td>
            <ButtonUI
              onClick={() => this.deleteCart(val.id)}
              style={{ backgroundColor: "red" }}
            >
              Delete
            </ButtonUI>
          </td>
        </tr>
      );
    });
  };

  deleteCart = (idx) => {
    Axios.delete(`${API_URL}/carts/${idx}`)
      .then((res) => {
        console.log(res.data);
        alert("sudah terhapus");
        this.renderData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container">

      {this.state.dataCart.length > 0 ? {
        
       <Table>
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
        <Table/>
      } : {
        <Alert>
        your cart is empty <Link >go shopping</Link>
        </Alert>
      }}

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
