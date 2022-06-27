import { useRef, useState } from "react";
import getBase64 from "../Functions/getBase64";

function Create({ setCreateData }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const [type, setType] = useState("1");

  const fileInput = useRef();

  const buttonHandler = () => {
    const file = fileInput.current.files[0];

    if (file) {
      getBase64(file).then((photo) => {
        console.log(photo);
        setCreateData({
          title,
          author,
          description,
          photo,

          type,
        });
      });
    } else {
      setCreateData({
        title,
        author,
        description,
        photo: null,

        type,
      });
    }
    setTitle("");
    setAuthor("");
    setDescription("");

    setType("1");
  };

  const inputHandler = (e, which) => {
    switch (which) {
      case "title":
        setTitle(e.target.value);
        break;
      case "author":
        setAuthor(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;

      case "type":
        setType(e.target.value);
        break;

      default:
    }
  };

  return (
    <div className="add">
      <div className="create-title">
        <h2>Add New Book</h2>
      </div>
      <div className="create-tab">
        <div className="form-group">
          {/* <div className=""> */}
          <label>Book title</label>
          <input
            type="text"
            className="form"
            onChange={(e) => inputHandler(e, "title")}
            value={title}
          />
          <small className="small">Add new book title here.</small>
          <label>Book author</label>
          <input
            type="text"
            className="form"
            onChange={(e) => inputHandler(e, "author")}
            value={author}
          />
          <small className="small">Add new book author here.</small>

          <div className="form-group">
            <label>Photo</label>
            <input ref={fileInput} type="file" className="form-control" />
            <small className="form-text text-muted">Items photo.</small>
          </div>

          <div className="form-group">
            <label>Boxe's description</label>
            <textarea
              type="text"
              className="form num "
              onChange={(e) => inputHandler(e, "description")}
              value={description}
            />
          </div>
          <div className="">
            <div className="form-group">
              <label>Book type</label>
              <select
                className="form"
                onChange={(e) => inputHandler(e, "type")}
                value={type}
              >
                <option value="1">Documentary</option>
                <option value="2">Animation</option>
                <option value="3">Drama</option>
              </select>
              <small className="">Book type</small>
            </div>
          </div>
          <div className="list-buttons">
            <button type="button" className="btn-modal" onClick={buttonHandler}>
              Add
            </button>
          </div>
        </div>
      </div>
      //{" "}
    </div>
  );
}
export default Create;
