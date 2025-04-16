import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/products/${category.slug}`} className="category-card">
      <div className="category-image">
        <img src={category.imageUrl} alt={category.name} />
      </div>
      <h3 className="category-name">{category.name}</h3>
    </Link>
  );
};

export default CategoryCard;