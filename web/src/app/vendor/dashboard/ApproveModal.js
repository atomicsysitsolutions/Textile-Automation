// ApprovalModal.js
import React from 'react';

const ApprovalModal = ({ isOpen, signout }) => {
  if (!isOpen) return null;

  return (
<div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
  <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
    <div className="text-center text-lg">Your request is being processed.</div>
    <div className="text-center text-sm mb-8">Please wait for approval.</div>
    <div className="absolute bottom-0 right-0 m-4">
      <button
        onClick={signout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  </div>
</div>

  );
};

export default ApprovalModal;
