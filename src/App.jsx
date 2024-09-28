import Pagination from "./component/Pagination/Pagination";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Update from "./component/Update/Update";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pagination />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
