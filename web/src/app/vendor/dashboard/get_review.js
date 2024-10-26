import React, { useState, useEffect } from 'react';

const GetReviewbyvendorModal = ({ isOpen, onClose, reviews }) => {
    const [replies, setReplies] = useState({}); // Initialize state for replies

    const handleInputChange = (reviewId, text) => {
        setReplies({ ...replies, [reviewId]: text }); // Update state with new reply text
    };

    const submitReply = async (reviewId) => {
        const replyText = replies[reviewId];
        if (!replyText) return; // Do nothing if reply is empty

        try {
            const response = await fetch('https://localhost:7159/api/Products/PostReplyToReview', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ReviewId: reviewId, ReplyText: replyText }),
            });

            if (response.ok) {
                alert('Reply posted successfully');
            } else {
                alert('Failed to post reply');
            }
        } catch (error) {
            console.error('Error posting reply:', error);
            alert('An error occurred while posting the reply');
        }
    };
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
              <p className="reviewText">Review: {review.reviewText}</p>
              <input
                type="text"
                placeholder="Reply"
                className="replyInput"
                value={replies[review.reviewId] || ''}
                onChange={(e) => handleInputChange(review.reviewId, e.target.value)}
              />
              <button
                onClick={() => submitReply(review.reviewId)}
                className="replyButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Post Reply
              </button>
              <p className="text-sm text-gray-500 mt-2">Posted on: {review.createdAt ? formatDate(review.createdAt) : 'Date not provided'}</p>
            </div>
          ))}
          <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600">Close</button>
        </div>
      </div>
    );
};

export default GetReviewbyvendorModal;
