import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";
import CartScreen from "./pages/CartScreen";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ItemPage />} />
          <Route path="/cart" element={<CartScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
