import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Copmany_Profiling_Modal = ({ isOpen, onClose, onSubmit, modalContent }) => {
    const [formData, setFormData] = useState({
      
        companyName: '',
        description: '',
        exportMarket: '',
        country: '',
      
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
            const response = await axios.post('https://localhost:7159/api/Products/AddCompanyProfile', formData);
            setSuccessMessage('Profiling submitted successfully.');
            setError(null);
            onSubmit(formData); // Pass form data to parent component
            setIsProfilingModalOpen(false); // Close the modal after submission
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



export default Copmany_Profiling_Modal;
