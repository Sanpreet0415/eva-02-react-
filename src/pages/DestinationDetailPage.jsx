import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Carousel from '../components/Carousel'; // Adjust import path as needed

function DestinationDetailPage() {
  const { id } = useParams(); // Gets the destination ID from URL params
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Function to fetch destination details from Firebase
    const fetchDestination = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching
        const response = await fetch(`https://evaluation-02-react-default-rtdb.europe-west1.firebasedatabase.app/destinations/${id}.json`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        if (data) {
          setDestination(data); // Set the destination data
        } else {
          setError('Destination not found'); // Handle case where no data is returned
        }
      } catch (error) {
        console.error('Error fetching destination:', error);
        setError('Failed to load destination');
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchDestination(); // Fetch destination data
  }, [id]); // Depend on ID to refetch if the ID changes

  if (loading) return <div>Loading...</div>; // Show loading message while fetching
  if (error) return <div>{error}</div>; // Show error message if any

  if (!destination) return <div>No destination found</div>; // Handle case where no destination is found

  return (
    <div className="destination-detail">
      <h1>{destination.name}</h1>
      <img src={destination.profileImg} alt={destination.name} style={{ width: '100%', height: 'auto' }} />
      <Carousel images={destination.additionalImages} /> {/* Render carousel with additional images */}
      <p>{destination.description}</p>
      <p><strong>Country:</strong> {destination.country}</p>
      <p><strong>Average Budget:</strong> ${destination.averageBudget}</p>
      <p><strong>Admin Flag:</strong> {destination.adminFlag ? 'Yes' : 'No'}</p>
      <Link to={`/category/${destination.type}`}>Back to {destination.type} Destinations</Link>
    </div>
  );
}

export default DestinationDetailPage;
