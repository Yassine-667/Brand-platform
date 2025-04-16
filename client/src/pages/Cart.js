// src/pages/Cart.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeItem, updateQuantity } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="container">
          <div className="empty-cart">
            <i className="fas fa-shopping-cart empty-cart-icon"></i>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/categories" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (id, size, quantity) => {
    if (quantity < 1) return;
    updateQuantity(id, size, quantity);
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>

        <div className="cart-container">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div className="cart-item" key={`${item.id}-${item.size}`}>
                <div className="cart-item-image">
                  <img src={item.imageUrl} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h3 className="cart-item-name">
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </h3>
                  <p className="cart-item-size">Size: {item.size}</p>
                  <div className="cart-item-price">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.size, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          item.size,
                          parseInt(e.target.value) || 1
                        )
                      }
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.size, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-item-btn"
                    onClick={() => removeItem(item.id, item.size)}
                  >
                    <i className="fas fa-trash"></i> Remove
                  </button>
                </div>
                <div className="cart-item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({cart.totalItems} items)</span>
              <span>${cart.totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row">
              <span>Taxes</span>
              <span>${(cart.totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${(cart.totalPrice + cart.totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <button className="btn btn-primary checkout-btn">
              Proceed to Checkout
            </button>
            <Link to="/categories" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;