import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";
import "./Back.scss";
import Back from "./Components/Back";
import Front from "./Components/Front";
import LoginPage from "./Components/LoginPage";
import LogoutPage from "./Components/LogoutPage";
import RequireAuth from "./Components/RequireAuth";

//

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Front show="all" />} />
        <Route path="documentary" element={<Front show="documentary" />} />
        <Route path="animation" element={<Front show="animation" />} />
        <Route path="drama" element={<Front show="drama" />} />

        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Back />
            </RequireAuth>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
