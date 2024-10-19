import React, { useState } from "react";
import "./Header.scss";
import { BsSearch } from "react-icons/bs";
import { useMealContext } from "../../context/mealContext";
import { useNavigate } from "react-router-dom";
import { startFetchMealsBySearch } from "../../actions/mealsActions";

const SearchForm = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { dispatch } = useMealContext();

  const handleSearchTerm = (e) => {
    e.preventDefault();
    const term = e.target.value.replace(/[^\w\s]/gi, ""); // Sanitize input
    if (term.length !== 0) {
      setSearchTerm(term);
      setErrorMsg("");
    } else {
    }
  };

  const handleSearchResult = (e) => {
    e.preventDefault();
    if (searchTerm.toLowerCase().includes("pork")) {
      setErrorMsg("Pork not Allowed.");
      return;
    }

    // You can add more non-halal keywords to this check if necessary
    const nonHalalKeywords = ["pork", "alcohol", "non-halal"];
    if (
      nonHalalKeywords.some((keyword) =>
        searchTerm.toLowerCase().includes(keyword)
      )
    ) {
      setErrorMsg("Halal Food only.");
      return;
    }

    navigate("/");
    startFetchMealsBySearch(dispatch, searchTerm);
  };

  return (
    <form
      className="search-form flex flex-column align-center"
      onSubmit={handleSearchResult}
    >
      <div className="search-input-container flex align-center">
        <input
          type="text"
          className="form-control-input text-dark-gray fs-15"
          placeholder="Search recipes here ..."
          onChange={handleSearchTerm}
        />
        <button
          type="submit"
          className="form-submit-btn text-white text-uppercase fs-14"
        >
          <BsSearch className="btn-icon" size={20} />
        </button>
      </div>
      {errorMsg && <p className="error-message text-red">{errorMsg}</p>}
      {/* The error message will appear below the input */}
    </form>
  );
};

export default SearchForm;
