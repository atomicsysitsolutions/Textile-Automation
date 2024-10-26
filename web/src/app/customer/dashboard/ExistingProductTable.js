'use client'
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ExistingProductTable = ({ tableData }) => {
  const router = useRouter();




  const  handleCardClick = (productId) => {
    window.open(`dashboard/${productId}`,'_blank');
  };


  return (
    <div className="max-h-[400px] container mx-auto p-4 overflow-y-auto overflow-x-hidden" style={{ minWidth: "1310px", position: "relative", top: 50 }}>
    <div className="flex flex-wrap justify-start" style={{ width: "100%", position: "relative", top: 30, left: 80 }}>
      {tableData.map((item, index) => (
        <div
          key={index}
          className="my-2 px-1"
          style={{ minWidth: "300px", maxWidth: "300px" }}
          onClick={() => handleCardClick(item.productId)}
        >
          <article className="overflow-hidden rounded-lg shadow-lg" >
            <img
              alt="Product"
              className="block h-auto w-full"
              src={`https://localhost:7159/api/DisplayImage/DisplayProductImage?productId=${item.productId}`}
              style={{ height: '250px', width: "100%" }}
            />
            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 className="text-lg">{item.productName}</h1>
              <p className="text-gray-700 text-sm">${item.cost}</p>
            </header>
          </article>
        </div>
      ))}
    </div>



   
    </div>
  );
};

export default ExistingProductTable;