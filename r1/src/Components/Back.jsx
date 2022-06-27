import { useEffect, useReducer, useState } from "react";
import axios from "axios";
// import Create from "./Create";
import { Link } from "react-router-dom";

import { getDataFromServer } from "../Actions";
import BooksList from "./BooksList.jsx";
import reducer from "../Reducer/reducer";
import Create from "./Create";
import Edit from "./Edit";
import Navigation from "../Navigation/Navigation";
import { authConfig } from "../Functions/auth";

// import { authConfig } from "../Functions/auth.js";

function Back() {
  const [books, dispachBooks] = useReducer(reducer, []);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [createData, setCreateData] = useState(null);

  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };
  useEffect(() => {
    if (null === editData) {
      return;
    }
    axios
      .put("http://localhost:3005/books-manager/" + editData.id, editData)
      .then((res) => {
        console.log(res);
        setLastUpdate(Date.now());
      });
  }, [editData]);

  useEffect(() => {
    if (null === deleteId) {
      return;
    }
    axios
      .delete("http://localhost:3005/books-manager/" + deleteId.id)
      .then((res) => {
        console.log(res);
        setLastUpdate(Date.now());
      });
  }, [deleteId]);

  useEffect(() => {
    axios
      .get("http://localhost:3005/admin/books-manager", authConfig())
      .then((res) => {
        console.log(res.data);
        dispachBooks(getDataFromServer(res.data));
      });
  }, [lastUpdate]);

  useEffect(() => {
    if (null === createData) {
      return;
    }

    axios
      .post("http://localhost:3005/books-manager", createData)
      .then((res) => {
        console.log(res);
        setLastUpdate(Date.now());
      });
  }, [createData]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="header">
            <nav className="navigation">
              <a className="header-title" href="#">
                Bibliotheque
              </a>

              <div className="hamburger" onClick={toggleHamburger}>
                <Navigation />
              </div>
              <div
                className={
                  !hamburgerOpen
                    ? "navigation-bar inactive"
                    : "navigation-bar show"
                }
              >
                <Link className="nav-link" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/documentary">
                  Documentary
                </Link>
                <Link className="nav-link" to="/animation">
                  Animation
                </Link>
                <Link className="nav-link" to="/drama">
                  Drama
                </Link>
                <Link className="nav-link" to="/login">
                  Admin
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row-logout">
          <div className="logout">
            <Link className="logout-a" to="/logout">
              Log OUT
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="column-create">
            <Create books={books} setCreateData={setCreateData}></Create>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="colum-list-front">
            <div className=" card-body-front">
              <ul>
                {books.map((book) => (
                  <BooksList
                    key={book.id}
                    book={book}
                    setModalData={setModalData}
                    modalData={modalData}
                    setEditData={setEditData}
                    setDeleteId={setDeleteId}
                  >
                    {" "}
                  </BooksList>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Edit
        setEditData={setEditData}
        setModalData={setModalData}
        modalData={modalData}
        books={books}
        setDeleteId={setDeleteId}
      ></Edit>
    </>
  );
}
export default Back;
