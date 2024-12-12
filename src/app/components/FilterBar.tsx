import React from 'react';

interface FilterBarProps {
  onFilterChange: (filterType: string, value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  return (
    <div>
      <label>
        Genre:
        <select onChange={e => onFilterChange('genre', e.target.value)}>
          <option value="">All</option>
          <option value="hip-hop">Hip-Hop</option>
          <option value="rap">Rap</option>
        </select>
      </label>
      <label>
        Popularity:
        <select onChange={e => onFilterChange('popularity', e.target.value)}>
          <option value="">All</option>
          <option value="popular">Popular</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </label>
      <label>
        Location:
        <input type="text" onChange={e => onFilterChange('location', e.target.value)} placeholder="Enter city or state" />
      </label>
    </div>
  );
};

export default FilterBar;
