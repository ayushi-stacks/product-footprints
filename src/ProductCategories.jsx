import React, { useState } from 'react';
import './ProductCategories.css';

const ProductCategories = () => {
  const categories = [
    { name: 'Electronics' },
    { name: 'Clothing and Apparels' },
    { name: 'Household Essentials' },
    { name: 'Furniture' },
    { name: 'Groceries' },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addedProducts, setAddedProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // Main product list
  const products = [
    { name: 'Laptop', brand: 'Brand A', model: 'Model X', category: 'Electronics', footprint: 50 },
    { name: 'Laptop', brand: 'Brand B', model: 'Model Y', category: 'Electronics', footprint: 80 },
    { name: 'Bag', brand: 'Brand C', model: 'Model Z', category: 'Clothing and Apparels', footprint: 20 },
    { name: 'Bag', brand: 'Brand C', model: 'Model Z', category: 'Clothing and Apparels', footprint: 25 },
    { name: 'Refrigerator', brand: 'Brand D', model: 'Model W', category: 'Household Essentials', footprint: 100 },
    { name: 'Refrigerator', brand: 'Brand F', model: 'Model X', category: 'Household Essentials', footprint: 120 },
  ];

  // Separate list for recommended products
  const recommendationList = [
    { name: 'Laptop', brand: 'Brand X', model: 'Model A1', category: 'Electronics', footprint: 30 },
    { name: 'Laptop', brand: 'Brand Y', model: 'Model B2', category: 'Electronics', footprint: 55 },
    { name: 'Bag', brand: 'Brand Z', model: 'Model C3', category: 'Clothing and Apparels', footprint: 10 },
    { name: 'Bag', brand: 'Brand C', model: 'Model F5', category: 'Clothing and Apparels', footprint: 15 },
    { name: 'Bag', brand: 'Brand C', model: 'Model F5', category: 'Clothing and Apparels', footprint: 21 },
    { name: 'Refrigerator', brand: 'Brand D2', model: 'Model W1', category: 'Household Essentials', footprint: 75 },
    { name: 'Refrigerator', brand: 'Brand E4', model: 'Model S', category: 'Household Essentials', footprint: 70 },
    { name: 'Refrigerator', brand: 'Brand B', model: 'Model Y', category: 'Household Essentials', footprint: 100 },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddProduct = (product) => {
    setAddedProducts([...addedProducts, product]);
  };

  const handleAddRecommendedProduct = (product) => {
    setRecommendedProducts([...recommendedProducts, product]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...addedProducts];
    updatedProducts.splice(index, 1);
    setAddedProducts(updatedProducts);
  };

  const handleRemoveRecommendedProduct = (index) => {
    const updatedProducts = [...recommendedProducts];
    updatedProducts.splice(index, 1);
    setRecommendedProducts(updatedProducts);
  };

  const getRecommendations = (product) => {
    return recommendationList.filter(
      (recProduct) => recProduct.category === product.category && recProduct.footprint < product.footprint
    );
  };

  const calculateTotalFootprint = (productList) => {
    return productList.reduce((total, product) => total + product.footprint, 0);
  };

  const totalAddedFootprint = calculateTotalFootprint(addedProducts);
  const totalRecommendedFootprint = calculateTotalFootprint(recommendedProducts);
  const footprintSaved = totalAddedFootprint - totalRecommendedFootprint;

  return (
    <div className="product-categories-container">
      {/* Left Flexbox */}
      <div className="left-flexbox">
        <h2 className="categories-heading">CATEGORIES</h2>
        {selectedCategory ? (
          <div className="product-list">
            <div className="back-icon" onClick={() => setSelectedCategory(null)}>🔙</div>
            <h3>{selectedCategory.name}</h3>
            {products
              .filter((product) => product.category === selectedCategory.name)
              .map((product, index) => (
                <div key={index} className="product-box">
                  <div className="product-info">
                    <span className="product-name">{product.name}</span><br />
                    <span className="product-brand">{product.brand}</span><br />
                    <span className="product-model">{product.model}</span>
                  </div>
                  <button
                    className="add-button"
                    onClick={() => handleAddProduct(product)}
                  >
                    +
                  </button>
                </div>
              ))}
          </div>
        ) : (
          <div className="categories-list">
            {categories.map((category, index) => (
              <div
                key={index}
                className="category-box"
                onClick={() => handleCategoryClick(category)}
              >
                <span className="category-name">{category.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Products Flexbox */}
      <div className="products-flexbox">
        <h3>Added Products</h3>
        {addedProducts.length > 0 ? (
          addedProducts.map((product, index) => (
            <div key={index} className="added-product">
                    <span className="product-name">{product.name}, {product.brand}, {product.model}</span>
              <button
                className="remove-button"
                onClick={() => handleRemoveProduct(index)}
              >
                ✕
              </button>
              <div className="recommendation-box">
                {getRecommendations(product).map((rec, recIndex) => (
                  <div key={recIndex} className="recommendation-item">
                    <span>{rec.brand} {rec.model}</span>
                    <button
                      className="add-recommendation-button"
                      onClick={() => handleAddRecommendedProduct(rec)}
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No products added yet.</p>
        )}
      </div>

      {/* Recommended Products Flexbox */}
      <div className="recommended-flexbox">
        <h3>Recommended Products</h3>
        {recommendedProducts.length > 0 ? (
          recommendedProducts.map((product, index) => (
            <div key={index} className="recommended-product">
              <span>{product.brand} {product.model}</span>
              <button
                className="remove-recommended-button"
                onClick={() => handleRemoveRecommendedProduct(index)}
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <p>No recommended products added yet.</p>
        )}
      </div>

      {/* Analysis Flexbox */}
      <div className="analysis-flexbox">
        <h3>Footprint Analysis</h3>
        <p className="content">Total Added Footprint: {totalAddedFootprint} kg CO2e</p>
        <p className="content">Total Recommended Footprint: {totalRecommendedFootprint} kg CO2e</p>
        <p className="content">Footprint Saved: {footprintSaved} kg CO2e</p>
        <p className="encouragement">Keep saving more!</p>
      </div>
    </div>
  );
};

export default ProductCategories;
