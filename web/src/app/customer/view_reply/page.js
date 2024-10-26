'use client'

import React, { useState, useEffect } from 'react';
import style from "../css/customer_style.css"
const GetViewReplyModal = ({ isOpen, onClose, replyreview }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full modal">
                <h1 className="text-lg font-bold">Reply Review</h1>
                {replyreview.map((replyreview, index) => (
                    <div key={index} className="bg-gray-100 p-4 my-2 rounded">
                        <h3 className="text-lg font-bold">Product Name: {replyreview.productName}</h3>

                        <div className="reviewTextContainer">
                            <h3 className="text-lg font-bold">Reply Review</h3>
                            <p className="reviewText text-lg">{replyreview.replyText}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Posted on: {replyreview.createdAt ? formatDate(replyreview.createdAt) : 'Date not provided'}</p>
                    </div>
                ))}
                <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600">Close</button>
            </div>
        </div>
    );
};

export default GetViewReplyModal;
