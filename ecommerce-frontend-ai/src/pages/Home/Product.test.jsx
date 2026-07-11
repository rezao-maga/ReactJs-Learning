import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import { Product } from "./Product.jsx";

vi.mock("axios");

describe("Product component", () => {
  let product;
  let loadCart;
  let user;

  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

    loadCart = vi.fn();
    user = userEvent.setup();
  });

  // UI Rendering Test
  it("renders product information correctly", () => {
    render(<Product product={product} loadCart={loadCart} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();

    expect(screen.getByText("$10.90")).toBeInTheDocument();

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      product.image,
    );

    expect(screen.getByTestId("product-rating-stars")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png",
    );

    expect(
      screen.getByText(product.rating.count.toString()),
    ).toBeInTheDocument();
  });

  // User Interaction + API Test
  it("adds the product to the cart when Add to Cart is clicked", async () => {
    render(<Product product={product} loadCart={loadCart} />);

    const addToCartButton = screen.getByTestId("add-to-cart-button");

    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: product.id,
      quantity: 1,
    });

    expect(loadCart).toHaveBeenCalled();
  });

  // User Interaction Test
  it("updates the selected quantity when the user chooses a different option", async () => {
    render(<Product product={product} loadCart={loadCart} />);

    const quantitySelect = screen.getByTestId("product-quantity-container");

    await user.selectOptions(quantitySelect, "5");

    expect(quantitySelect).toHaveValue("5");

    await user.selectOptions(quantitySelect, "3");

    expect(quantitySelect).toHaveValue("3");

    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 3,
    });
    expect(loadCart).toHaveBeenCalledWith();
  });
});
