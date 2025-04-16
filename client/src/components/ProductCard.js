// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image">
        <img src={product.imageUrl} alt={product.name} />
        {product.isNew && <span className="product-badge new">New</span>}
        {product.discount > 0 && (
          <span className="product-badge discount">{product.discount}% OFF</span>
        )}
      </Link>
      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="product-price">
          {product.discount > 0 ? (
            <>
              <span className="price-original">${product.price.toFixed(2)}</span>
              <span className="price-discounted">
                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="price">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
      <button className="btn btn-primary product-btn">Add to Cart</button>
    </div>
  );
};

export default ProductCard;