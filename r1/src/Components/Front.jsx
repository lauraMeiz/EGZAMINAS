import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { getDataFromServer } from "../Actions";
import reducer from "../Reducer/reducer";
import BooksList from "./BooksList";
import Navigation from "../Navigation/Navigation";
export default function Front({ show }) {
  const [books, dispachBooks] = useReducer(reducer, []);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3005/books-list/" + show).then((res) => {
      console.log(res.data);
      dispachBooks(getDataFromServer(res.data));
    });
  }, [show, lastUpdate]);

  const doSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    axios
      .get("http://localhost:3005/books-list-search/?s=" + e.target.value)
      .then((res) => {
        dispachBooks(getDataFromServer(res.data));
      });
  };

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

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
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>

                {/* <Link
                  className="nav-link"
                 
                  to="/admin"
                >
                  Admin
                </Link> */}
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className="row-search">
        <div className="oneSearch">
          <label>Search by title</label>
          <input type="text" onChange={doSearch} value={search}></input>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="column-create"></div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="column-create">
            <div className="colum-list-front">
              <div className=" card-body-front">
                <ul>
                  {books.map((book) => (
                    <BooksList key={book.id} book={book}>
                      {" "}
                    </BooksList>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
