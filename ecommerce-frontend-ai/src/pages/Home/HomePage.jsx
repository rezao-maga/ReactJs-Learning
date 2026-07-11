import axios from "axios";
import "./HomePage.css";
import { ProductsGrid } from "./ProductsGrid.jsx";
import { Header } from "../../components/Header.tsx";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export function HomePage({ cart, loadCart }) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [products, setProducts] = useState([]);

  //Use effect rules with async
  useEffect(() => {
    const fetchHomeData = async () => {
      const urlPath = search
        ? `/api/products?search=${search}`
        : "/api/products";
      const response = await axios.get(urlPath);
      setProducts(response.data);
    };
    fetchHomeData();
  }, [search]);

  return (
    <>
      <Header cart={cart} />

      <title>Ecomerce Project</title>
      <link
        rel="icon"
        type="image/png"
        href="/favicon/home-favicon.png"
      />
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
