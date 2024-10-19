import React from "react";
import { Link } from "react-router-dom";
import "./Category.scss";

const CategoryList = ({ categories }) => {
  // Define non-halal keywords to filter out
  const nonHalalKeywords = ["pork", "alcohol", "non-halal"]; // Add more keywords as necessary

  // Filter out categories that contain non-halal keywords (case insensitive)
  const filteredCategories = categories.filter((category) => {
    const { strCategory: title } = category;
    return !nonHalalKeywords.some((keyword) =>
      title.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="section-wrapper bg-whitesmoke">
      <div className="container">
        <div className="sc-title">Categories</div>
        <section className="sc-category grid">
          {filteredCategories.map((category) => {
            const {
              idCategory: id,
              strCategory: title,
              strCategoryThumb: thumbnail,
            } = category;

            return (
              <Link
                to={`/meal/category/${title}`}
                className="category-itm align-center justify-center"
                key={id}
              >
                <div className="category-itm-img h-100 w-100 flex align-center justify-center">
                  <img src={thumbnail} alt={title} />
                  <div className="category-itm-title bg-orange">
                    <h3 className="text-white fs-11 fw-6 ls-1 text-uppercase">
                      {title}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default CategoryList;
