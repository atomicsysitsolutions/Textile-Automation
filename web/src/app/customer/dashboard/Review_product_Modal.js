// Review_Modal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Review_Modal = ({ isOpen, onClose, modalContent, onSubmit }) => {
  const parseToIntOrUndefined = (value) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? undefined : parsed;
  };

  const [formData, setFormData] = useState({
    reviewText: modalContent?.fields.find(field => field.name === 'ReviewText')?.value || '',
    createdAt: new Date().toISOString(), // Format the current date as an ISO string
    userId: parseToIntOrUndefined(modalContent?.fields.find(field => field.name === 'UserId')?.value),
    productId: parseToIntOrUndefined(modalContent?.fields.find(field => field.name === 'ProductId')?.value),
  });
  
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (modalContent) {
      setFormData(prevState => ({
        ...prevState,
        ProductId: modalContent.fields.find(field => field.name === 'ProductId')?.value || '',
        UserId: modalContent.fields.find(field => field.name === 'UserId')?.value || '',
    
    

      }));
    }
  }, [modalContent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://localhost:7159/api/Products/SubmitReview', formData);
      setSuccessMessage("Review submitted successfully");
     
      setError(null); // Clear any previous errors
      onSubmit(formData); // Pass form data to parent component for further processing if needed
      onClose(); // Close the review modal after successful submission
    }  catch (error) {console.error("Error submitting review:", error.response || error); // Log the full error for debugging

    let errorMessage = "Error submitting review."; // Default error message
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);

      if (error.response.data && typeof error.response.data === 'object') {
        // If the response includes error details, use them to construct a more specific message
        errorMessage = error.response.data.message || JSON.stringify(error.response.data);
      } else if (typeof error.response.data === 'string') {
        // If the response is a string, use it directly
        errorMessage = error.response.data;
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      errorMessage = "No response from the server. Check your network connection.";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
      errorMessage = error.message;
    }

    setError(errorMessage); // Set the constructed error message
  }

  };
  

  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <button className="absolute top-0 right-0 m-4" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl mb-4 text-blue-500">{modalContent.title}</h2>
        {modalContent.fields.map(field => (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
            />
          </div>
        ))}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <div className="flex justify-between">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Close</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};
export default Review_Modal;
