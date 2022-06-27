import { useNavigate } from "react-router-dom";

// import { login } from "./Functions/auth";
import axios from "axios";

import { useState } from "react";
import { login } from "../Functions/auth";

function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const doLogin = () => {
    axios.post("http://localhost:3005/login", { user, pass }).then((res) => {
      console.log(res.data);
      if ("ok" === res.data.msg) {
        login(res.data.key);
        navigate("/admin/", { replace: true });
      }
    });
  };
  return (
    <div className="modal">
      <div className="add ">
        <div className="create-title">
          <h3>Please Login</h3>
        </div>
        <div className="create-tab">
          <div className="form-group">
            <label>Your name: </label>
            Name:{" "}
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label> Your password: </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            ></input>
          </div>
          <div className="list-buttons">
            <button className="btn-save" onClick={doLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
