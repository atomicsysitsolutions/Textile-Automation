import React, { useState } from 'react';
import axios from 'axios';

const Modal1 = ({ isOpen, onClose, onSubmit, modalContent }) => {
  const [formData, setFormData] = useState({
    MaterialComposition: '',
    Fabrictype: '',
    Weavetype: '',
    MinOrder: '',
    ExportMarket: '',
    DeliveryTime: '',
    Price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      // Assuming it's a POST request, you might need to adjust based on your API
      const response = await axios.post('https://localhost:7159/api/Fabric/GetRecommendationProduct', {
        // Your payload here
        MaterialComposition: formData.MaterialComposition,
        Fabrictype: formData.Fabrictype,
        Weavetype: formData.Weavetype,
        MinOrder: formData.MinOrder,
        ExportMarket: formData.ExportMarket,
        DeliveryTime: formData.DeliveryTime,
        Price: formData.Price,
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Other headers if required
        },
      });
      console.log(response.data);
      onSubmit(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // It might be helpful to log the response from the server to get more insights
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
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
        <div className="flex justify-between">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Close</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Modal1;
