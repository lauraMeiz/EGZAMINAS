import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { getDataFromServer } from "../Actions";
import reducer from "../Reducer/reducer";
import BooksList from "./BooksList";
export default function Front({ show }) {
  const [books, dispachBooks] = useReducer(reducer, []);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  //   const [books, setBooks] = useState([]);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  //   const [search, setSearch] = useState("");
  // const [autor, setAutor] = useState([]);
  //   const [deleteId, setDeleteId] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:3005/books-list/" + show).then((res) => {
      console.log(res.data);
      dispachBooks(getDataFromServer(res.data));
    });
  }, [show, lastUpdate]);

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

  // const doSearch = (e) => {
  //   setSearch(e.target.value);
  //   console.log(e.target.value);
  //   axios
  //     .get("http://localhost:3005/autors-list-search/?s=" + e.target.value)
  //     .then((res) => {
  //       dispachAutors(getDataFromServer(res.data));
  //     });
  // };
  //   const doSearch = (e) => {
  //     setSearch(e.target.value);
  //     console.log(e.target.value);
  //     axios
  //       .get("http://localhost:3005/books-search/?s=" + e.target.value)
  //       .then((res) => {
  //         setBooks(res.data);
  //       });
  //   };

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };
  //   useEffect(() => {
  //     axios.get("http://localhost:3005/autors-books").then((res) => {
  //       console.log(res.data);
  //       setBooks(res.data);
  //     });
  //   }, [lastUpdate]);

  useEffect(() => {
    axios.get("http://localhost:3005/books-manager").then((res) => {
      console.log(res.data);
      dispachBooks(getDataFromServer(res.data));
    });
  }, [lastUpdate]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="header">
            <nav className="navigation">
              <a className="header-title" href="#">
                Bibliotheque
              </a>

              <div
                className="hamburger"
                // style={{ display: hamburgerOpen ? "inline" : "none" }}
                // onClick={toggleHamburger}
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
      {/* <div className="container">
        <div className="row-logout">
          <div className="logout">
            <Link className="logout-a" to="/logout">
              Log OUT
            </Link>
          </div>
        </div>
      </div> */}
      {/* <div className="row-search">
        <div className="oneSearch">
          <label>Search</label>
          <input type="text" onChange={doSearch} value={search}></input>
        </div>
      </div> */}
      <div className="container">
        <div className="row">
          <div className="column-create">
            {/* <Create
              containers={containers}
              setCreateData={setCreateData}
              boxes={boxes}
            ></Create> */}
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
        containers={containers}
        boxes={boxes}
        setDeleteId={setDeleteId}
      ></Edit> */}
    </>
  );
}