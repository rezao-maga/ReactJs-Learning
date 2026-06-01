import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { HomePage } from "./pages/Home/HomePage.jsx";
import { OrdersPage } from "./pages/Orders/OrdersPage.jsx";
import { TrackingPage } from "./pages/Tracking/TrackingPage.jsx";
import { CheckoutPage } from "./pages/Checkout/CheckoutPage.jsx";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage.jsx";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route
        path="checkout"
        element={<CheckoutPage cart={cart} loadCart={loadCart} />}
      ></Route>
      <Route
        path="orders"
        element={<OrdersPage cart={cart} loadCart={loadCart} />}
      ></Route>
      <Route
        path="tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      />
      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
  );
}

export default App;
