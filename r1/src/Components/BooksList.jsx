import none from "../img/none.png";

function BooksList({ book, setDeleteId, setModalData }) {
  return (
    <li className="list-item">
      <div className="tree-line tree-line-front">
        <div className="list-content">{book.title}</div>
        <div className="list-content">
          {["documentary", "animation", "drama"][book.type - 1]}
        </div>
        <div className="list-content">{book.author} </div>
        <div className="list-content">{book.description}</div>
        <div className="list-content-front">
          {" "}
          <img src={book.photo ? book.photo : none} alt="photo" />
        </div>
        <div className="list-buttons">
          <button
            type="button"
            className="btn-modal "
            onClick={() => setModalData(book)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn-delete "
            onClick={() => setDeleteId({ id: book.id })}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default BooksList;
