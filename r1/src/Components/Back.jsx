import { useEffect, useReducer, useState } from "react";
import axios from "axios";
// import Create from "./Create";
import { Link } from "react-router-dom";

import { getDataFromServer } from "../Actions";
import BooksList from "./BooksList.jsx";
import reducer from "../Reducer/reducer";
import Create from "./Create";

// import Create from "./Create.jsx";
// import Edit from "./Edit.jsx";
// import CreateBook from "./CreateBook.jsx";
// import { authConfig } from "../Functions/auth.js";
// import Edit from "./Edit";
// import { authConfig } from "../Functions/auth.js";
// import Navigation from "./Navigation/Navigation";

// import EditBoxes from "./EditBoxes";

function Back() {
  const [books, dispachBooks] = useReducer(reducer, []);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [createData, setCreateData] = useState(null);

  //   const [editData, setEditData] = useState(null);

  //   const [deleteId, setDeleteId] = useState(null);
  //   const [modalData, setModalData] = useState(null);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  //   const [boxes, setBoxes] = useState([]);
  //   useEffect(() => {
  //     if (null === editData) {
  //       return;
  //     }
  //     axios
  //       .put("http://localhost:3005/autors-manager/" + editData.id, editData)
  //       .then((res) => {
  //         console.log(res);
  //         setLastUpdate(Date.now());
  //       });
  //   }, [editData]);

  //   useEffect(() => {
  //     if (null === deleteId) {
  //       return;
  //     }
  //     axios
  //       .delete("http://localhost:3005/autors-manager/" + deleteId.id)
  //       .then((res) => {
  //         console.log(res);
  //         setLastUpdate(Date.now());
  //       });
  //   }, [deleteId]);

  //   useEffect(() => {
  //     if (null === deleteId) {
  //       return;
  //     }
  //     axios
  //       .delete("http://localhost:3005/autors-books/" + deleteId.id)
  //       .then((res) => {
  //         console.log(res);
  //         setLastUpdate(Date.now());
  //       });
  //   }, [deleteId]);

  useEffect(() => {
    axios.get("http://localhost:3005/books-manager").then((res) => {
      console.log(res.data);
      dispachBooks(getDataFromServer(res.data));
    });
  }, [lastUpdate]);

  //   useEffect(() => {
  //     axios.get("http://localhost:3005/autors-books").then((res) => {
  //       console.log(res.data);
  //       setBooks(res.data);
  //     });
  //   }, [lastUpdate]);

  //   const saveBooks = (title, description, price, photo, id) => {
  //     console.log(title, description, price, photo, id);
  //     console.log(autors.id);
  //     axios
  //       .post("http://localhost:3005/autors-books", {
  //         title: title,
  //         description: description,
  //         price: price,
  //         photo: photo,
  //         autor_id: id,
  //       })
  //       .then((res) => {
  //         setLastUpdate(Date.now());
  //         //
  //       });
  //   };

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

  //   console.log(containers);
  //   console.log(containers.id);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="header">
            <nav className="navigation">
              <a className="header-title" href="#">
                Logistics Company
              </a>

              <div
                className="hamburger"
                // style={{ display: hamburgerOpen ? "inline" : "none" }}
                onClick={toggleHamburger}
              >
                {/* <Navigation /> */}
              </div>
              <div
                className={
                  !hamburgerOpen
                    ? "navigation-bar inactive"
                    : "navigation-bar show"
                }
              >
                <Link
                  className="nav-link"
                  // style={{ display: hamburgerOpen ? "none" : "inline" }}
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="nav-link"
                  // style={{ display: hamburgerOpen ? "none" : "inline" }}
                  to="/documentary"
                >
                  Documentary
                </Link>
                <Link
                  className="nav-link"
                  // style={{ display: hamburgerOpen ? "none" : "inline" }}
                  to="/animation"
                >
                  Animation
                </Link>
                <Link
                  className="nav-link"
                  // style={{ display: hamburgerOpen ? "none" : "inline" }}
                  to="/drama"
                >
                  Drama
                </Link>
                <Link
                  className="nav-link"
                  // style={{ display: hamburgerOpen ? "none" : "inline" }}
                  to="/admin"
                >
                  Admin
                </Link>

                {/* <Link
                  className="nav-link"
                  // style={{ display: hamburgerOpen ? "none" : "inline" }}
                  to="/admin"
                >
                  Admin
                </Link> */}
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
            <div className="row">
              <div className="column-create">
                {/* <Create
                  books={books}
                
                  setBooks={setBooks}
                  setLastUpdate={setLastUpdate}
                  saveBooks={saveBooks}
                ></Create> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="column-create">
            {/* <CreateBoxes
              boxes={boxes}
              containers={containers}
              setBoxes={setBoxes}
              setLastUpdate={setLastUpdate}
              saveBoxes={saveBoxes}
            ></CreateBoxes> */}
            <div className="colum-list-front">
              <div className=" card-body-front">
                <ul>
                  {books.map((book) => (
                    <BooksList
                      key={book.id}
                      book={book}
                      //   container={container}
                      //   setModalData={setModalData}
                      //   modalData={modalData}
                      //   setEditData={setEditData}
                      //   setDeleteId={setDeleteId}
                    >
                      {" "}
                    </BooksList>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Edit
        setEditData={setEditData}
        setModalData={setModalData}
        modalData={modalData}
        autors={autors}
        books={books}
        setDeleteId={setDeleteId}
      ></Edit> */}
    </>
  );
}
export default Back;
