import React from "react";
import { Table } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import swal from "sweetalert";

class AdminDashboard extends React.Component {
  state = {
    productList: [],
    createForm: {
      productName: "",
      price: 0,
      category: "Phone",
      image: "",
      desc: "",
    },
    editForm: {
      productName: "",
      price: 0,
      category: "Phone",
      image: "",
      desc: "",
    },
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

  createProductHandler = () => {
    Axios.post(`${API_URL}/products`, this.state.createForm)
      .then((res) => {
        swal("Success", "Your item has been added", "success");
        this.getProductList();
      })
      .catch((err) => {
        swal("Error!", "your item not added", "error");
      });
  };

  componentDidMount() {
    this.getProductList();
  }

  renderProductList = () => {
    return this.state.productList.map((val) => {
      const { id, productName, price, category, image, desc } = val;
      return (
        <tr>
          <td> {id} </td>
          <td> {productName} </td>
          <td> {price} </td>
          <td> {category} </td>
          <td>
            {" "}
            <img
              src={image}
              alt=""
              style={{ height: "100px", objectFit: "contain" }}
            />{" "}
          </td>
          <td> {desc} </td>
          <td>
            <ButtonUI type="contained">Edit</ButtonUI>
          </td>
          <td>
            <ButtonUI type="outlined">Delete</ButtonUI>
          </td>
        </tr>
      );
    });
  };

  inputHandler = (e, field, form) => {
    const { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
  };

  editBtnHandler = () => {};

  render() {
    return (
      <div className="container py-4">
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Description</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderProductList()}</tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>
                <TextField
                  onChange={(e) =>
                    this.inputHandler(e, "productName", "createForm")
                  }
                  placeholder="Name"
                />
              </td>
              <td>
                <TextField
                  onChange={(e) => this.inputHandler(e, "price", "createForm")}
                  placeholder="Price"
                />
              </td>
              <td colSpan={2}>
                <select
                  onChange={(e) =>
                    this.inputHandler(e, "category", "createForm")
                  }
                  className="form-control"
                >
                  <option value="Phone">Phone</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Tab">Tab</option>
                  <option value="Desktop">Desktop</option>
                </select>
              </td>
              <td>
                <TextField
                  onChange={(e) => this.inputHandler(e, "image", "createForm")}
                  placeholder="Image"
                />
              </td>
              <td>
                <TextField
                  onChange={(e) => this.inputHandler(e, "desc", "createForm")}
                  placeholder="Description"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={7}></td>
              <td colSpan={1}>
                <ButtonUI onClick={this.createProductHandler} type="contained">
                  Create
                </ButtonUI>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <TextField
                  onChange={(e) =>
                    this.inputHandler(e, "productName", "editForm")
                  }
                  placeholder="Name"
                />
              </td>
              <td>
                <TextField
                  onChange={(e) => this.inputHandler(e, "price", "editForm")}
                  placeholder="Price"
                />
              </td>
              <td colSpan={2}>
                <select
                  onChange={(e) => this.inputHandler(e, "category", "editForm")}
                  className="form-control"
                >
                  <option value="Phone">Phone</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Tab">Tab</option>
                  <option value="Desktop">Desktop</option>
                </select>
              </td>
              <td>
                <TextField
                  onChange={(e) => this.inputHandler(e, "image", "editForm")}
                  placeholder="Image"
                />
              </td>
              <td>
                <TextField
                  onChange={(e) => this.inputHandler(e, "desc", "editForm")}
                  placeholder="Description"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={7}></td>
              <td colSpan={1}>
                <ButtonUI type="contained">save</ButtonUI>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

export default AdminDashboard;
