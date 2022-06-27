import { useEffect, useRef, useState } from "react";

import getBase64 from "../Functions/getBase64";

function Edit({ setModalData, modalData, setEditData }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const [type, setType] = useState("1");
  const [id, setId] = useState("0"); //butinai kitaip neveiks

  const fileInput = useRef();

  const buttonHandler = () => {
    const file = fileInput.current.files[0];

    if (file) {
      getBase64(file).then((photo) => {
        console.log(photo);
        setEditData({
          title,
          author,
          description,
          photo,
          type,
        });
        setModalData(null);
      });
    } else {
      setEditData({
        title,
        author,
        description,
        photo: "",

        type,
        id,
      });
      setModalData(null);
    }
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

  useEffect(() => {
    if (modalData === null) {
      setTitle("");
      setAuthor("");
      setDescription("");

      setType("1");
    } else {
      setTitle(modalData.title);
      setAuthor(modalData.author);
      setDescription(modalData.description);

      setType(modalData.type);
      setId(modalData.id);
    }
  }, [modalData]);

  if (modalData === null) {
    return null;
  }

  return (
    <div className="modal">
      <div className="add ">
        <div className="edit-title">
          <h3>Edit Item</h3>
          {/* <button
            type="button"
            className="btn-close"
            onClick={() => setModalData(null)}
          >
            <span aria-hidden="true">&times;</span>
          </button> */}
        </div>

        <div className="create-tab">
          <div className="form-group">
            <label>Items title</label>
            <input
              type="text"
              className="form"
              onChange={(e) => inputHandler(e, "title")}
              value={title}
            />
            <small className="form-text text-muted">Add new title here.</small>
          </div>
          <div className="container p-0">
            <div className="row">
              <div className="col-4">
                <div className="form-group">
                  <label>Author</label>
                  <input
                    type="text"
                    className="form little"
                    onChange={(e) => inputHandler(e, "author")}
                    value={author}
                  />
                  <small className="small">Items author.</small>
                </div>
              </div>
              <div className="">
                <div className="form-group">
                  <label>Photo</label>
                  <input ref={fileInput} type="file" className="form-control" />
                  <small className="form-text text-muted">Tree photo.</small>
                </div>
              </div>
              <div className="">
                <div className="form-group">
                  <label>Description</label>
                  <select
                    className="form"
                    onChange={(e) => inputHandler(e, "description")}
                    value={description}
                  >
                    <option value="1">Documentary</option>
                    <option value="2">Animation</option>
                    <option value="3">Drama</option>
                  </select>
                  <small className="small">Book's type.</small>
                </div>
              </div>
            </div>
          </div>
          <div className="list-buttons">
            <button
              type="button"
              className="btn btn-save"
              onClick={buttonHandler}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => setModalData(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
