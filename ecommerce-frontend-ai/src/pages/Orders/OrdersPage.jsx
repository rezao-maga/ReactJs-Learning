import { Header } from "../../components/Header.tsx";
import "./OrdersPage.css";
import { OrdersGrid } from "./OrdersGrid.jsx";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    fetchOrdersData();
  }, []);
  return (
    <Fragment>
      <title>Orders</title>
      <Header cart={cart} />
      <link
        rel="icon"
        type="image/png"
        href="/favicon/orders-favicon.png"
      />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={orders} loadCart={loadCart}/>
      </div>
    </Fragment>
  );
}
