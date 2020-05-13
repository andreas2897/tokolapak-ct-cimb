import userTypes from "../types/user";

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT_SUCCESS } = userTypes;

const init_state = {
  id: 0,
  username: "",
  fullName: "",
  address: {},
  role: "",
  errMsg: "",
  cookieChecked: false,
<<<<<<< HEAD
  searchInput: "",
=======
  cartItems: 0,
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      const { username, fullName, role, id } = action.payload;
      return {
        ...state,
        username,
        fullName,
        role,
        id,
        cookieChecked: true,
      };
    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload, cookieChecked: true };
    case "ON_REGISTER_FAIL":
      return { ...state, errMsg: action.payload, cookieChecked: true };
    case ON_LOGOUT_SUCCESS:
      return { ...init_state, cookieChecked: true };
    case "COOKIE_CHECK":
      return { ...state, cookieChecked: true };
<<<<<<< HEAD
    case "SEARCH_PRODUCT":
      return { ...state, cookieChecked: true, searchInput: action.payload };
=======
    case "FILL_CART":
      return { ...state, cartItems: action.payload };
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb
    default:
      return { ...state };
  }
};
