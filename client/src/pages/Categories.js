// src/pages/Categories.js
import React, { useState, useEffect } from 'react';
import CategoryCard from '../components/CategoryCard';

const Categories = () => {
  // Sample data - in a real app, this would come from your API
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'T-Shirts',
      slug: 'tshirts',
      imageUrl: 'https://via.placeholder.com/300x400?text=T-Shirts',
    },
    {
      id: 2,
      name: 'Pants',
      slug: 'pants',
      imageUrl: 'https://via.placeholder.com/300x400?text=Pants',
    },
    {
      id: 3,
      name: 'Dresses',
      slug: 'dresses',
      imageUrl: 'https://via.placeholder.com/300x400?text=Dresses',
    },
    {
      id: 4,
      name: 'Jackets',
      slug: 'jackets',
      imageUrl: 'https://via.placeholder.com/300x400?text=Jackets',
    },
    {
      id: 5,
      name: 'Sweaters',
      slug: 'sweaters',
      imageUrl: 'https://via.placeholder.com/300x400?text=Sweaters',
    },
    {
      id: 6,
      name: 'Shorts',
      slug: 'shorts',
      imageUrl: 'https://via.placeholder.com/300x400?text=Shorts',
    },
    {
      id: 7,
      name: 'Skirts',
      slug: 'skirts',
      imageUrl: 'https://via.placeholder.com/300x400?text=Skirts',
    },
    {
      id: 8,
      name: 'Activewear',
      slug: 'activewear',
      imageUrl: 'https://via.placeholder.com/300x400?text=Activewear',
    },
  ]);

  return (
    <div className="categories-page">
      <div className="container">
        <h1 className="page-title">All Categories</h1>
        <div className="grid grid-categories">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;