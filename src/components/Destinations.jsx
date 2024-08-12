// src/components/Destinations.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Destinations = () => {
  const [destinations, setDestinations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('https://masai-course.s3.ap-south-1.amazonaws.com/editor/uploads/2024-08-01/db_704178.json');
        setDestinations(response.data.destinations);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading destinations: {error.message}</p>;

  return (
    <div>
      <h1>Destinations</h1>
      <ul>
        {Object.keys(destinations).map(key => {
          const dest = destinations[key];
          return (
            <li key={key}>
              <h2>{dest.name}</h2>
              <p><strong>Country:</strong> {dest.country}</p>
              <p>{dest.description}</p>
              <img src={dest.profileImg} alt={dest.name} style={{ width: '200px', height: 'auto' }} />
              <div>
                <h3>Additional Images:</h3>
                {dest.additionalImages.map((img, index) => (
                  <img key={index} src={img} alt={`${dest.name} ${index}`} style={{ width: '100px', height: 'auto', margin: '5px' }} />
                ))}
              </div>
              <p><strong>Average Budget:</strong> ${dest.averageBudget}</p>
              <p><strong>Admin Flag:</strong> {dest.adminFlag ? 'Yes' : 'No'}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Destinations;
