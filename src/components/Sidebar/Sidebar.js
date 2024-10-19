import React from "react";
import { useSidebarContext } from "../../context/sidebarContext";
import { ImCancelCircle } from "react-icons/im";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useMealContext } from "../../context/mealContext";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useSidebarContext();
  const { categories } = useMealContext();

  // Filter out categories with "Pork" in the title (case insensitive)
  const filteredCategories = categories.filter((category) => {
    return !category.strCategory.toLowerCase().includes("pork");
  });

  return (
    <nav className={`sidebar ${isSidebarOpen ? "sidebar-visible" : ""}`}>
      <button type="button" className="navbar-hide-btn" onClick={closeSidebar}>
        <ImCancelCircle size={24} />
      </button>

      <div className="side-content">
        <ul className="side-nav">
          {filteredCategories.map((category) => (
            <li className="side-item" key={category.idCategory}>
              <Link
                to={`/meal/category/${category.strCategory}`}
                className="side-link ls-1 fs-13"
                onClick={closeSidebar}
              >
                {category.strCategory}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
