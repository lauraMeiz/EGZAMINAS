import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";
import "./Back.scss";
import Back from "./Components/Back";
import Front from "./Components/Front";
// import Front from "./Components/Front";

//

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Front show="all" />} />
        <Route path="documentary" element={<Front show="documentary" />} />
        <Route path="animation" element={<Front show="animation" />} />
        <Route path="drama" element={<Front show="drama" />} />

        <Route path="admin" element={<Back />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
