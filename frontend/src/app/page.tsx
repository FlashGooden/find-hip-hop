"use client";
import React, { useState } from "react";
import MapComponent from "./components/MapComponent/MapComponent";
import FilterBar from "./components/FilterBar";
import styles from './page.module.css';

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
    <div className={styles.container}>
       <header className={styles.header}>
        <img src="/find-hip-hop-logo.png" alt="Find Hip Hop Logo" width={90} height={90} />
        <h1 className={styles.title}>Find Hip Hop</h1>
      </header>
      <div className={styles.filterBar}>
          <FilterBar onFilterChange={handleFilterChange} />
      </div>
      <MapComponent filters={filters} />
    </div>
  );
};

export default HomePage;
