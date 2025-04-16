// src/pages/ProductListing.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const ProductListing = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    price: [0, 200],
    sizes: [],
    colors: [],
    sort: 'newest',
  });

  // Sample data - in a real app, this would come from your API
  useEffect(() => {
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
        {
          id: 3,
          name: 'Graphic T-Shirt',
          price: 34.99,
          discount: 0,
          isNew: true,
          imageUrl: 'https://via.placeholder.com/300x400?text=T-Shirt+3',
          category: 'tshirts',
        },
        {
          id: 4,
          name: 'Premium T-Shirt',
          price: 39.99,
          discount: 0,
          isNew: false,
          imageUrl: 'https://via.placeholder.com/300x400?text=T-Shirt+4',
          category: 'tshirts',
        },
        {
          id: 5,
          name: 'Slim Fit Jeans',
          price: 59.99,
          discount: 0,
          isNew: false,
          imageUrl: 'https://via.placeholder.com/300x400?text=Jeans+1',
          category: 'pants',
        },
        {
          id: 6,
          name: 'Straight Leg Jeans',
          price: 54.99,
          discount: 15,
          isNew: false,
          imageUrl: 'https://via.placeholder.com/300x400?text=Jeans+2',
          category: 'pants',
        },
      ];

      // Filter by category if provided
      const filteredProducts = category
        ? sampleProducts.filter((product) => product.category === category)
        : sampleProducts;

      setProducts(filteredProducts);
      setLoading(false);
    }, 500);
  }, [category]);

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    setFilters({
      ...filters,
      [type]: value,
    });
  };

  return (
    <div className="product-listing-page">
      <div className="container">
        <div className="product-listing-header">
          <h1 className="page-title">
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
          </h1>
          <div className="product-count">{products.length} products</div>
        </div>

        <div className="product-listing-content">
          <aside className="filters">
            <div className="filter-group">
              <h3>Price Range</h3>
              <div className="price-range">
                <span>${filters.price[0]}</span>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={filters.price[1]}
                  onChange={(e) =>
                    handleFilterChange('price', [filters.price[0], parseInt(e.target.value)])
                  }
                />
                <span>${filters.price[1]}</span>
              </div>
            </div>

            <div className="filter-group">
              <h3>Size</h3>
              <div className="size-options">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <label key={size} className="size-option">
                    <input
                      type="checkbox"
                      checked={filters.sizes.includes(size)}
                      onChange={() => {
                        const newSizes = filters.sizes.includes(size)
                          ? filters.sizes.filter((s) => s !== size)
                          : [...filters.sizes, size];
                        handleFilterChange('sizes', newSizes);
                      }}
                    />
                    <span>{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3>Color</h3>
              <div className="color-options">
                {['Black', 'White', 'Red', 'Blue', 'Green'].map((color) => (
                  <label key={color} className="color-option">
                    <input
                      type="checkbox"
                      checked={filters.colors.includes(color)}
                      onChange={() => {
                        const newColors = filters.colors.includes(color)
                          ? filters.colors.filter((c) => c !== color)
                          : [...filters.colors, color];
                        handleFilterChange('colors', newColors);
                      }}
                    />
                    <span>{color}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div className="products">
            <div className="sort-bar">
              <label>
                Sort by:
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </label>
            </div>

            {loading ? (
              <div className="loading">Loading products...</div>
            ) : (
              <div className="grid grid-products">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;