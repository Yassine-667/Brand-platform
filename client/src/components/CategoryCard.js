// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  // Calculate the actual price after discount
  const actualPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation to product detail page
    
    // Add default size (first size would be used in a real app with size data)
    const defaultSize = 'M';
    
    addItem({
      id: product.id,
      name: product.name,
      price: actualPrice,
      size: defaultSize,
      quantity: 1,
      imageUrl: product.imageUrl
    });

    // Show quick feedback
    const button = e.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Added';
    button.disabled = true;
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
    }, 2000);
  };

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
                ${actualPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="price">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
      <button className="btn btn-primary product-btn" onClick={handleAddToCart}>
        <i className="fas fa-shopping-cart"></i> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;