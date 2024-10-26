import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ isOpen, onClose, onSubmit, modalContent }) => {
  const [formData, setFormData] = useState({
    ProductName: '',
    DeliveryTime: '',
    Cost: ''
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
      const response = await axios.get('https://localhost:7159/api/get_item/GetProductsByCriteria', {
        params: {
          ProductName: formData.ProductName,
          DeliveryTime: formData.DeliveryTime,
          Cost: formData.Cost
        }
      });
    
      // Call the onSubmit prop with the response data
      onSubmit(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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

export default Modal;
