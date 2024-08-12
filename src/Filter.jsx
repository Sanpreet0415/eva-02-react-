import { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';

function Filter() {
  const [filters, setFilters] = useState({ country: '', budget: '', type: '' });
  const { data, setData } = useContext(DataContext);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters) => {
    if (data) {
      const filtered = Object.values(data).filter(dest => 
        (filters.country ? dest.country === filters.country : true) &&
        (filters.budget ? dest.averageBudget <= filters.budget : true) &&
        (filters.type ? dest.type === filters.type : true)
      );
      setData(filtered);
    }
  };

  return (
    <div>
      <input name="country" placeholder="Country" onChange={handleFilterChange} />
      <input name="budget" type="number" placeholder="Budget" onChange={handleFilterChange} />
      <input name="type" placeholder="Type" onChange={handleFilterChange} />
    </div>
  );
}

export default Filter;
