import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./CategoryPage.css";

function CategoryPage() {
  const { type } = useParams();
  const [destinations, setDestinations] = useState([]);
  const [filters, setFilters] = useState({ country: "", budget: "" });
  const [sort, setSort] = useState("name");
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(`https://evaluation-02-react-default-rtdb.europe-west1.firebasedatabase.app/destinations.json`);
        const data = await response.json();

        if (!data) {
          throw new Error("No data found");
        }

        // Convert data object to array and add IDs
        const fetchedDestinations = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));

        // Filter by type
        let filteredDestinations = fetchedDestinations.filter(destination => destination.type === type);

        // Apply filters
        if (filters.country) {
          filteredDestinations = filteredDestinations.filter(destination => 
            destination.country.toLowerCase().includes(filters.country.toLowerCase())
          );
        }

        if (filters.budget) {
          const maxBudget = parseFloat(filters.budget);
          filteredDestinations = filteredDestinations.filter(destination => 
            destination.budget <= maxBudget
          );
        }

        // Apply sorting
        filteredDestinations.sort((a, b) => {
          if (sort === "name") return a.name.localeCompare(b.name);
          if (sort === "budget") return a.budget - b.budget;
          if (sort === "popularity") return b.popularity - a.popularity;
          return 0;
        });

        setDestinations(filteredDestinations);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setError("Failed to load destinations");
      }
    };

    fetchDestinations();
  }, [type, filters, sort]);

  return (
    <div className="category-page">
      <h1>{type} Destinations</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="filters">
        <label>Country:</label>
        <input
          type="text"
          value={filters.country}
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
        />
        <label>Budget:</label>
        <input
          type="number"
          value={filters.budget}
          onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
        />
        <label>Sort by:</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name">Name</option>
          <option value="budget">Budget</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
      <ul>
        {destinations.map(destination => (
          <li key={destination.id}>
            <Link to={`/destination/${destination.id}`}>{destination.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryPage;
