import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addCart } from "../redux/action";
import "./ProductCard.css";
import { renderStars } from "../utilits/helper.js";

const ProductCard = ({ product }) => {
  console.log("ProductCard rendered for:", product);
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("");

  const isInStock = product?.stock > 0;

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    toast.success("Added to cart");
    dispatch(addCart({ ...product, selectedSize }));
  };

  return (
    <div className="product-card">
      {/* Image */}
      <div className="product-image">
        <img src={product.image} alt="product" title={product.title} />
      </div>

      {/* Details */}
      <div className="product-details">
        <h3 className="product-name" title={product.title}>
          {product.title.length > 30
            ? `${product.title.substring(0, 27)}...`
            : product.title}
        </h3>

        <p className="product-description">
          {product.description.length > 90
            ? `${product.description.substring(0, 90)}...`
            : product.description}
        </p>

        {/* Price & Rating */}
        <div className="product-price-rating">
          <span className="product-price">${product.price}</span>
          {product.rating && (
            <span className="product-rating">
              {renderStars(product.rating.rate)} ({product.rating.count})
            </span>
          )}
        </div>

        {/* Size Options */}
        <div className="product-size-options d-flex flex-wrap justify-content-between align-items-center">
          <p>Size:</p>
          <div className="size-options d-flex gap-2 flex-wrap">
            {["XS", "SM", "MD", "XL"].map((size) => (
              <label key={size} className="size-option">
                <input
                  type="radio"
                  name={`size-${product.id}`}
                  value={size}
                  checked={selectedSize === size}
                  onChange={() => handleSizeChange(size)}
                />
                <span className="size-button">{size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="product-buttons">
          <Link to={`/product/${product.id}`} className="btn btn-buy">
            Buy Now
          </Link>

          {isInStock ? (
            <button className="btn btn-add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          ) : (
            <button className="btn" disabled>
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
