'use client'
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Inquiry_Modal from "./Inquiry_Product_Modal";
import Review_Modal from "../../customer/dashboard/Review_product_Modal.js";
import GetReviewModal from "../../customer/dashboard/get_review.js";

const NewProductTable = ({tableData}) => {

    const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
    const [inquiryModalContent, setInquiryModalContent] = useState(null);

    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [reviewModalContent, setReviewModalContent] = useState(null);

    const [checkReviewModalOpen, setCheckReviewModalOpen] = useState(false);
    const [reviews, setReviews] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
  
    const fetchImage = async (productId) => {
      const response = await fetch(`https://localhost:7159/api/DisplayImage/DisplayProductImage?productId=${productId}`, {
        method: 'GET',
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const dataUrl = URL.createObjectURL(blob);
        setImageUrl(dataUrl);
        setIsModalOpen(true); // Open the modal after fetching the image
      } else {
        console.error('Failed to fetch image');
      }
    };

    const closeModal = () => setIsModalOpen(false);

    const openInquiryModal = (productId) => {

        const userObject1 = JSON.parse(localStorage.getItem('userName'));
        const userObject2 = JSON.parse(localStorage.getItem('userEmail'));
        const userObject3 = JSON.parse(localStorage.getItem('userId'));

        const userId = userObject3 ? userObject3.userId : '';

        const userName = userObject1 ? userObject1.userName : '';
        const userEmail = userObject2 ? userObject2.userEmail : '';
        const content = {
            title: "Inquiry Product",
            fields: [
                { name: "ProductId", label: "Product Id", type: "number", value: productId },
                { name: "UserId", label: "User Id", type: "number", value: userId },
                { name: "Name", label: "Name", type: "text", value: userName },
                { name: "Email", label: "Email", type: "text", value: userEmail },
                { name: "PhoneNumber", label: "PhoneNumber", type: "text" },
                { name: "Address", label: "Address", type: "text" },
                { name: "InquiryText", label: "Inquiry Text", type: "text" }
            ]
        };
        setInquiryModalContent(content);
        setInquiryModalOpen(true);
    };
    const closeInquiryModal = () => {
        setInquiryModalOpen(false);
    };


    const open_review_Modal = (productId) => {

        const userObject1 = JSON.parse(localStorage.getItem('userId'));

        const userId = userObject1 ? userObject1.userId : '';


        const content = {
            title: "Review Product",
            fields: [
                { name: "ProductId", label: "Product Id", type: "number", value: productId },
                { name: "UserId", label: "User Id", type: "number", value: userId },

                { name: "ReviewText", label: "Review Text", type: "text" },


            ]
        };
        setReviewModalContent(content);
        setReviewModalOpen(true);
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


   

    const handleSubmitinquiry = async (data) => {
        try {

            console.log("inquiry submitted:", data);
        } catch (error) {
            console.error('Error submitting inquiry:', error);
        } finally {

            closeInquiryModal();
        }
    };


    const closeReviewModal = () => {
        setReviewModalOpen(false)
    };


    const handleSubmitreview = async (data) => {
        try {

            console.log("Review submitted:", data);

        } catch (error) {
            console.error('Error submitting Review:', error);
        } finally {

            closeReviewModal
        }
    };







    const closeGetReviewModal = () => {
        setCheckReviewModalOpen(false);
    };




    return (
        <div className="w-[269%] overflow-x-auto">
            <div className="md:px-32 py-8 w-full">
                <div className="shadow overflow-hidden rounded border-b border-gray-200">
                    <div className="max-h-[400px] overflow-y-auto">
                        <table class="min-w-full bg-white">
                            <thead class="bg-gray-800 text-white">
                                <tr>
                                    <th scope="col" class="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">S/N</th>
                                    <th scope="col" class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Product</th>
                                    <th scope="col" class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Fabric</th>

                                    <th scope="col" class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Material</th>
                                    <th scope="col" class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Weave</th>

                                    <th scope="col" class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Company</th>
                                    <th scope="col" class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Export</th>
                                    <th scope="col" class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Country</th>
                                    <th scope="col" class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Check Review</th>
                                    <th scope="col" class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Inquiry</th>
                                    <th scope="col" class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Review</th>
                                </tr>
                            </thead>
                            <tbody class="text-gray-700">
                                {tableData.map((item, index) => (
                                    <tr key={index} class={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                        <td class="text-left py-3 px-4">{index + 1}</td>
                                        <td class="text-left py-3 px-4">{item.productname}</td>
                                        <td class="text-left py-3 px-4">{item.fabrictype}</td>

                                        <td class="text-left py-3 px-4">{item.materialComposition}</td>
                                        <td class="text-left py-3 px-4">{item.weavetype}</td>


                                        <td class="text-left py-3 px-4">{item.companyName}</td>
                                        <td class="text-left py-3 px-4">{item.exportMarket}</td>
                                        <td class="text-left py-3 px-4">{item.country}</td>


                                        <td class="text-left py-3 px-4">
                                            <button onClick={() => openGetReviewModal(item.productId)} class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">Check Review</button>
                                        </td>
                                        <td class="text-left py-3 px-4">
                                            <button onClick={() => openInquiryModal(item.productId)} class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">Inquiry</button>
                                        </td>
                                        <td class="text-left py-3 px-4">
                                            <button onClick={() => open_review_Modal(item.productId)} class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">Review</button>
                                        </td>
                                        <td className="text-left py-3 px-4">
                                            <button
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                                onClick={() => fetchImage(item.productId)}
                                            >
                                                See Image
                                            </button>

                                            {isModalOpen && (
                                                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                                                    <div className="bg-white p-4 rounded-lg">
                                                        {imageUrl && <img src={imageUrl} alt="Product" />}
                                                        <button onClick={closeModal} className="mt-2 p-2 bg-red-500 text-white rounded">Close</button>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Inquiry_Modal isOpen={inquiryModalOpen} onClose={closeInquiryModal} onSubmit={handleSubmitinquiry} modalContent={inquiryModalContent} />
                        <Review_Modal isOpen={reviewModalOpen} onClose={closeReviewModal} onSubmit={handleSubmitreview} modalContent={reviewModalContent} />
                        <GetReviewModal isOpen={checkReviewModalOpen} onClose={closeGetReviewModal} reviews={reviews} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProductTable;