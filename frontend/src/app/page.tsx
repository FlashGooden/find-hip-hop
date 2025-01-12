"use client";
import React, { useState } from "react";
import MapComponent from "./components/MapComponent/MapComponent";
import FilterBar from "./components/FilterBar";

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState({
    genre: "",
    popularity: "",
    location: "",
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <div>
       <header>
        <img src="/find-hip-hop-logo.png" alt="Find Hip Hop Logo" width={90} height={90} />
        <h1>Find Hip Hop</h1>
      </header>
      <FilterBar onFilterChange={handleFilterChange} />
      <MapComponent filters={filters} />
    </div>
  );
};

export default HomePage;
