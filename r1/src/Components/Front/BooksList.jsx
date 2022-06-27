import none from "../../img/none.png";

function BooksList({ book }) {
  return (
    <li className="list-items">
      <div className="tree-line tree-line-front">
        <div className="list-content-front">
          <h3>{book.title}</h3>
        </div>
        <div className="list-content-front">{book.author} </div>
        <div className="list-content-front">
          <h5>{["documentary", "animation", "drama"][book.type - 1]}</h5>
        </div>
        <div className="list-content-front">
          <p>{book.description}</p>
        </div>
        <div className="image">
          {" "}
          <img src={book.photo ? book.photo : none} alt="photo" />
        </div>
      </div>
    </li>
  );
}

export default BooksList;
