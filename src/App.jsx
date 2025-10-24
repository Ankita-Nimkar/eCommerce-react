import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Checkout from "./pages/Checkout";
function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
