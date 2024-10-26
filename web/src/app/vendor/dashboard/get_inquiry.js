import React from 'react';

const GetInquiryModal = ({ isOpen, onClose, inquiry }) => {
    if (!isOpen) return null;

    // Helper function to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Inquiries</h2>
                {inquiry.length > 0 ? inquiry.map((item, index) => (
                    <div key={index} className="bg-gray-100 p-4 my-2 rounded">
                         <h3 className="text-lg font-bold">{item.productName || 'Name not provided'}</h3>
                       <p>Name: {item.name}</p>
                        <p>Email: {item.email}</p>
                        <p>Address: {item.address}</p>
                        <p>Phone: {item.phoneNumber}</p>
                        <div className="mt-2">
                            <h4 className="font-bold">Inquiry Text:</h4>
                            <p>{item.inquiryText || 'No inquiry text provided'}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Posted on: {item.createdAt ? formatDate(item.createdAt) : 'Date not provided'}</p>
                    </div>
                )) : (
                    <p className="text-center text-gray-500">No inquiries to display.</p>
                )}
                <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600">Close</button>
            </div>
        </div>
    );
};

export default GetInquiryModal;
