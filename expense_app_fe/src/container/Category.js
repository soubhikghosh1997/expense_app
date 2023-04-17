import React from "react";

import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
const Category = () => {
  return (
    <div className="setting-category-wrapper">
      <div className="setting-category-form">
        <CategoryForm />
      </div>
      <div className="setting-category-list">
        <CategoryList />
      </div>
    </div>
  );
};

export default Category;
