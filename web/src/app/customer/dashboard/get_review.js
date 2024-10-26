import React, { useState, useEffect } from 'react';
import style from "../css/customer_style.css"
const GetReviewModal = ({ isOpen, onClose, reviews }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full modal">
                <h2>Reviews</h2>
                {reviews.map((review, index) => (
                    <div key={index} className="bg-gray-100 p-4 my-2 rounded">
                        <h3 className="text-lg font-bold">{review.name}</h3>

                        <div className="reviewTextContainer">
                            <p className="reviewText">{review.reviewText}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Posted on: {review.createdAt ? formatDate(review.createdAt) : 'Date not provided'}</p>
                    </div>
                ))}
                <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600">Close</button>
            </div>
        </div>
    );
};

export default GetReviewModal;
