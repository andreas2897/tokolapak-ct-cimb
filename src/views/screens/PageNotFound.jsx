import React from "react";
<<<<<<< HEAD
=======
import { Link } from "react-router-dom";
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb

class PageNotFound extends React.Component {
  render() {
    return (
<<<<<<< HEAD
      <div>
        <div>
          <center>
            <h1>Hiya Hiya Hiya Page Not Found</h1>
            <h3>page yang anda cari tidak ada</h3>
          </center>
        </div>
=======
      <div className="container text-center">
        <h1>Oops.. 404 Page Not Found</h1>
        <Link to="/">Back to home</Link>
>>>>>>> 6b5598974e1af64d3812150b44ccdc72833d1aeb
      </div>
    );
  }
}

export default PageNotFound;
