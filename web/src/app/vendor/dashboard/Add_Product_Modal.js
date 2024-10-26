import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Add_product_modal = ({ isOpen, onClose, onSubmit, modalContent }) => {
    const [formData, setFormData] = useState({
      
        productname: modalContent?.fields.find(field => field.name === 'ProductName')?.value || '',
        fabrictype: modalContent?.fields.find(field => field.name === 'FabricType')?.value || '',
        gsm: modalContent?.fields.find(field => field.name === 'GSM')?.value || '',
        weavetype: modalContent?.fields.find(field => field.name === 'WeaveType')?.value || '',
        materialcomposition: modalContent?.fields.find(field => field.name === 'MaterialComposition')?.value || '',
        yarntype: modalContent?.fields.find(field => field.name === 'YarnType')?.value || '',
        cost: parseFloat(modalContent?.fields.find(field => field.name === 'Cost')?.value) || 0, // Default to 0 or another sensible default
        deliverytime: parseInt(modalContent?.fields.find(field => field.name === 'DeliveryTime')?.value, 10) || 0,
        minimumorder: parseInt(modalContent?.fields.find(field => field.name === 'MinimumOrder')?.value, 10) || 0,
        companyId: parseInt(modalContent?.fields.find(field => field.name === 'CompanyId')?.value, 10) || 0,
       
      
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (modalContent) {
            setFormData(prevState => ({
                ...prevState,
             
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
            const response = await axios.post('https://localhost:7159/api/Products/AddProduct', formData);
    
            setSuccessMessage('Product submitted successfully.');
            setError(null);
            onSubmit(formData); 
            setIsAddProductModalOpen(false); 
        } catch (error) {
           // Error handling logic...
        }
    };

    const closeModal = () => {
        onClose(); // Close the modal when the close button is clicked
        setIsProfilingModalOpen(false); // Ensure the modal state is updated
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-none shadow-lg max-w-md w-full">
            <button className="absolute top-0 right-0 m-4" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 className="text-2xl mb-4 text-blue-500">{modalContent.title}</h2>
            {modalContent.fields.reduce((rows, field, idx) => {
                if (idx % 2 === 0) rows.push([]);
                rows[rows.length - 1].push(field);
                return rows;
            }, []).map((row, idx) => (
                <div key={idx} className="flex justify-between mb-4">
                    {row.map(field => (
                        <div key={field.name} className={`flex-1 ${field.customClass ? field.customClass : ''} mr-2 last:mr-0`}>
                            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                            {field.type === 'dropdown' ? (
                                <select
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
                                >
                                    {/* Dynamically populate options */}
                                    <option value="">Select an option</option>
                                    {field.options && field.options.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
                                />
                            )}
                        </div>
                    ))}
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



export default Add_product_modal;
