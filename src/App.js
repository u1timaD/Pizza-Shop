// import React, { createContext, useState } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import "./scss/app.scss";
import FullPizza from "./pages/FullPizza";

// export const SearchContext = createContext();

function App() {
  // const [search, setSearch] = useState('');

  return (
    <div className="wrapper">
      <div className="content">
        <div className="container">
          {/* <SearchContext.Provider value={{ search, setSearch }}> */}
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza/:id" element={<FullPizza />} />
            </Route>
          </Routes>
          {/* </SearchContext.Provider> */}
        </div>
      </div>
    </div>
  );
}

export default App;
