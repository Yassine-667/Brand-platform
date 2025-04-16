// src/pages/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Sample data - in a real app, this would come from your API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const fetchedProduct = {
        id: parseInt(id),
        name: 'Premium Cotton T-Shirt',
        price: 39.99,
        discount: 10,
        isNew: true,
        description: 'This premium cotton t-shirt is made from high-quality materials for comfort and durability. Perfect for casual wear, it features a classic fit and comes in multiple colors.',
        features: [
          'Made from 100% premium cotton',
          'Comfortable fit',
          'Machine washable',
          'Available in multiple colors'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Navy', 'Gray'],
        images: [
          'https://via.placeholder.com/600x800?text=T-Shirt+Front',
          'https://via.placeholder.com/600x800?text=T-Shirt+Back',
          'https://via.placeholder.com/600x800?text=T-Shirt+Side',
          'https://via.placeholder.com/600x800?text=T-Shirt+Detail'
        ],
        category: 'tshirts'
      };

      const sampleRelatedProducts = [
        {
          id: 101,
          name: 'V-Neck T-Shirt',
          price: 29.99,
          discount: 0,
          isNew: false,
          imageUrl: 'https://via.placeholder.com/300x400?text=V-Neck+T-Shirt',
        },
        {
          id: 102,
          name: 'Long Sleeve T-Shirt',
          price: 44.99,
          discount: 15,
          isNew: true,
          imageUrl: 'https://via.placeholder.com/300x400?text=Long+Sleeve+T-Shirt',
        },
        {
          id: 103,
          name: 'Graphic T-Shirt',
          price: 34.99,
          discount: 0,
          isNew: false,
          imageUrl: 'https://via.placeholder.com/300x400?text=Graphic+T-Shirt',
        },
        {
          id: 104,
          name: 'Striped T-Shirt',
          price: 32.99,
          discount: 0,
          isNew: true,
          imageUrl: 'https://via.placeholder.com/300x400?text=Striped+T-Shirt',
        },
      ];

      setProduct(fetchedProduct);
      setRelatedProducts(sampleRelatedProducts);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    // In a real app, you would dispatch an action to add to cart
    console.log('Added to cart:', {
      product: product.id,
      size: selectedSize,
      quantity,
    });
    
    alert('Product added to cart!');
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail">
          <div className="product-gallery">
            <div className="product-main-image">
              <img src={product.images[activeImageIndex]} alt={product.name} />
            </div>
            <div className="product-thumbnails">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={image} alt={`${product.name} thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info">
            <nav className="breadcrumb">
              <Link to="/">Home</Link> / 
              <Link to={`/products/${product.category}`}>{product.category}</Link> / 
              <span>{product.name}</span>
            </nav>

            <h1 className="product-title">{product.name}</h1>

            <div className="product-price">
              {product.discount > 0 ? (
                <>
                  <span className="price-original">${product.price.toFixed(2)}</span>
                  <span className="price-discounted">
                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                  <span className="discount-badge">{product.discount}% OFF</span>
                </>
              ) : (
                <span className="price">${product.price.toFixed(2)}</span>
              )}
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <h3>Features:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-options">
              <div className="size-options">
                <h3>Size:</h3>
                <div className="size-buttons">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-button ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="quantity-selector">
                <h3>Quantity:</h3>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>
            </div>

            <div className="product-actions">
              <button className="btn btn-primary btn-add-to-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn btn-outline btn-wishlist">
                <i className="far fa-heart"></i> Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        <div className="related-products">
          <h2 className="section-title">You May Also Like</h2>
          <div className="grid grid-products">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;