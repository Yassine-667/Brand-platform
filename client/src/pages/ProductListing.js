// src/pages/ProductListing.js (with better error handling)
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const ProductListing = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Simplified filters
  const [filters, setFilters] = useState({
    price: [0, 200],
    sort: 'newest',
  });

  // Sample data - in a real app, this would come from your API
  useEffect(() => {
    try {
      // Simulate API call
      setTimeout(() => {
        const sampleProducts = [
          {
            id: 1,
            name: 'Classic T-Shirt',
            price: 29.99,
            discount: 0,
            isNew: false,
            imageUrl: 'https://via.placeholder.com/300x400?text=T-Shirt+1',
            category: 'tshirts',
          },
          {
            id: 2,
            name: 'V-Neck T-Shirt',
            price: 24.99,
            discount: 10,
            isNew: false,
            imageUrl: 'https://via.placeholder.com/300x400?text=T-Shirt+2',
            category: 'tshirts',
          },
          // More sample products...
        ];

        // Filter by category if provided
        const filteredProducts = category
          ? sampleProducts.filter((product) => product.category === category)
          : sampleProducts;

        setProducts(filteredProducts);
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Failed to load products. Please try again later.");
      setLoading(false);
    }
  }, [category]);

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  // Render even if products array is empty
  return (
    <div className="product-listing-page">
      <div className="container">
        <div className="product-listing-header">
          <h1 className="page-title">
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
          </h1>
          <div className="product-count">{products.length} products</div>
        </div>

        {products.length === 0 ? (
          <div className="no-products">
            <p>No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-products">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;