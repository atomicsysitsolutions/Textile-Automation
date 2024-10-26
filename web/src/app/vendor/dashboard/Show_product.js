'use client'
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import GetinquiryModal from './get_inquiry.js';
import GetReviewbyvendorModal from './get_review.js';
const ShowProductTable = () => {
    const [productData, setproductData] = useState([]);
    const [checkInquiryModalOpen, setCheckInquiryModalOpen] = useState(false);
    const [inquiry, setinquiry] = useState([]);
    const [checkReviewModalOpen, setCheckReviewModalOpen] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchproduct = async () => {
            try {
                const userObject1 = JSON.parse(localStorage.getItem('userId'));
                const userData = userObject1 ? userObject1.userId : '';


                const response = await axios.post('https://localhost:7159/api/get_item/GetProduct', { VendorId: userData });
                setproductData(response.data);
                console.log(response.data)

            } catch (error) {
                console.error("An error occurred while fetching the review count:", error);
            }
        };

        fetchproduct();
    }, []);

    const openGetInquiryModal = async (productId) => {
        try {
            const response = await axios.post('https://localhost:7159/api/get_item_for_vendor/GetInquiriesByProductId', { productId });
            setinquiry(response.data);
            setCheckInquiryModalOpen(true);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };
    const closeGetInquiryModal = () => {
        setCheckInquiryModalOpen(false)
    };

    const openGetReviewModal = async (productId) => {
        try {
            const response = await axios.post('https://localhost:7159/api/get_item/GetReviewByProduct', { productId });
            setReviews(response.data);
            setCheckReviewModalOpen(true);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };
    const closeGetReviewModal = () => {
        setCheckReviewModalOpen(false);
    };


    return (
        <div className=" w-[100%] overflow-x-auto">
            <div className="shadow overflow-hidden rounded border-b border-gray-200">
                <div className="max-h-[400px] overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">S/N</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Product Name</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Fabric Type</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Material</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Weave Type</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Cost</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Delivery Time</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Minimum Order</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Check Inquires</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Check Review</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {productData.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-5 py-3 whitespace-nowrap">{index + 1}</td>
                                    <td className="px-5 py-3 whitespace-nowrap">{item.productName}</td>
                                    <td className="px-5 py-3 whitespace-nowrap">{item.fabricType}</td>
                                    <td className="px-5 py-3 whitespace-nowrap">{item.materialComposition}</td>
                                    <td className="px-5 py-3 whitespace-nowrap">{item.weaveType}</td>
                                    <td className="px-5 py-3 whitespace-nowrap">{item.cost}</td>
                                    <td className="px-5 py-3 whitespace-nowrap">{item.deliveryTime}</td>
                                    <td className="px-5 py-3 whitespace-nowrap">{item.minimumOrder}</td>
                                    <td class="text-left py-3 px-2">
                                        <button onClick={() => openGetInquiryModal(item.productId)} class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded transition duration-150 ease-in-out">Check Inquiry</button>
                                    </td>
                                    <td class="text-left py-3 px-4">
                                            <button onClick={() => openGetReviewModal(item.productId)} class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded transition duration-150 ease-in-out">Check Review</button>
                                        </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <GetinquiryModal isOpen={checkInquiryModalOpen} onClose={closeGetInquiryModal} inquiry={inquiry}/>
                    <GetReviewbyvendorModal isOpen={checkReviewModalOpen} onClose={closeGetReviewModal} reviews={reviews} />
                </div>
            </div>
        </div>
    );
};

export default ShowProductTable;