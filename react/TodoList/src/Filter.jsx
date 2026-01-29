import React from "react";

const Filter = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { id: "all", label: "Все" },
    { id: "active", label: "Активные" },
    { id: "completed", label: "Завершенные" },
  ];

  return (
    <div className="filter-container">
      <div className="filter-buttons">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-btn ${currentFilter === filter.id ? "active" : ""}`}
            onClick={() => onFilterChange(filter.id)}
            data-testid={`filter-${filter.id}`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
