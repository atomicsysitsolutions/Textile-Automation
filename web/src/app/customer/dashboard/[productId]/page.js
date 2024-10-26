// ProductDetail.js
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Inquiry_Modal from '../Inquiry_Product_Modal.js';
import Review_Modal from '../Review_product_Modal.js';
import GetReviewModal from '../get_review.js';
const ProductDetail = ({ params }) => {
  const productId = params.productId

  const [product, setProduct] = useState(null);

  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryModalContent, setInquiryModalContent] = useState(null);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewModalContent, setReviewModalContent] = useState(null);

  const [checkReviewModalOpen, setCheckReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7159/api/get_item/GetProductById/${productId}`);
        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
        } else {
          // Handle error
          console.error('Failed to fetch product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();

  }, [productId]);






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


  const closeInquiryModal = () => {
    setInquiryModalOpen(false);
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
    <div>
      {product ? (
        <div className='overflow-hidden'>
          <h1 style={{ position: "relative", left: 601, top: 64, fontSize: 23, fontWeight: "bold" }}>Textile Exclusive Beautiful {product.productName}</h1>
          <h2 style={{ position: "relative", left: 601, top: 84, fontSize: 18, fontWeight: "bold", color: "#000000b3" }}>Company:</h2>
          <h2 style={{ position: "relative", left: 701, top: 54, fontSize: 23, fontWeight: "bold", color: "#000000b3" }}>{product.companyName}</h2>
          <h2 style={{ position: "relative", left: 601, top: 68, fontSize: 21, fontWeight: "bold", color: "#000000b3" }}>Company Info:</h2>
          <h2 style={{ position: "relative", left: 743, top: 72, fontSize: 18, color: "#000000b3" }}>{product.description}</h2>
          <h2 style={{ position: "relative", left: 1403, top: 192, fontSize: 18, color: "red" }}> ${product.cost}</h2>
          <button style={{ position: "relative", left: 703, top: 412, width: 300 }} onClick={() => openInquiryModal(product.productId)} class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">Inquiry</button>
          <button style={{ position: "relative", left: 803, top: 412, width: 300 }} onClick={() => openGetReviewModal(product.productId)} class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">Check Review</button>
          <img
            alt="Product"
            className="rounded-lg shadow-lg"
            src={`https://localhost:7159/api/DisplayImage/DisplayProductImage?productId=${productId}`}
            style={{ height: '580px', width: "580px", position: "relative", left: 4, top: -180 }}
          />
          <h2 style={{ position: "relative", left: 20, top: -150, fontSize: 21, fontWeight: "bold", color: "#000000cf" }}>Product Detail</h2>
          <h2 style={{ position: "relative", left: 20, top: -110, fontSize: 18, fontWeight: "bold", color: "#000000b3" }}>Fabric Type:</h2>
          <h2 style={{ position: "relative", left: 20, top: -80, fontSize: 18, fontWeight: "bold", color: "#000000b3" }}>Weave Type:</h2>
          <h2 style={{ position: "relative", left: 20, top: -50, fontSize: 18, fontWeight: "bold", color: "#000000b3" }}>Material:</h2>
          <h2 style={{ position: "relative", left: 20, top: -10, fontSize: 18, fontWeight: "bold", color: "#000000b3" }}>Min Order:</h2>
          <h2 style={{ position: "relative", left: 20, top: 20, fontSize: 18, fontWeight: "bold", color: "#000000b3" }}>Delivery Time:</h2>
          <h2 style={{ position: "relative", left: 20, top: 50, fontSize: 18, fontWeight: "bold", color: "#000000b3" }}>Export Market:</h2>
          <h2 style={{ position: "relative", left: 20, top: 80, fontSize: 18, fontWeight: "bold", color: "#000000b3" }}>Country:</h2>
          <h2 style={{ position: "relative", left: 20, top: 110, fontSize: 18, fontWeight: "bold", color: "#000000b3" }}>Send Review:</h2>


          <h2 style={{ position: "relative", left: 170, top: -325, fontSize: 18, fontWeight: "bold", color: "#000000b3" }}>{product.fabricType}</h2>
          <h2 style={{ position: "relative", left: 170, top: -295, fontSize: 18, fontWeight: "bold", color: "#000000b3" }}>{product.weaveType}</h2>
          <h2 style={{ position: "relative", left: 170, top: -265, fontSize: 18, fontWeight: "bold", color: "#000000b3" }}>{product.materialComposition}</h2>
          <h2 style={{ position: "relative", left: 170, top: -225, fontSize: 18, fontWeight: "bold", color: "#000000b3" }}>{product.minimumOrder}</h2>
          <h2 style={{ position: "relative", left: 170, top: -195, fontSize: 18, fontWeight: "bold", color: "#000000b3" }}>{product.deliveryTime}</h2>
          <h2 style={{ position: "relative", left: 170, top: -165, fontSize: 18, fontWeight: "bold", color: "#000000b3" }}>{product.exportMarket}</h2>
          <h2 style={{ position: "relative", left: 170, top: -135, fontSize: 18, fontWeight: "bold", color: "#000000b3" }}>{product.country}</h2>
          <button onClick={() => open_review_Modal(product.productId)} class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
            style={{ position: "relative", left: 161, top: -109 }}
          >Send Review</button>

        </div>

      ) : (
        <p>Loading...</p>
      )}
      <Inquiry_Modal isOpen={inquiryModalOpen} onClose={closeInquiryModal} onSubmit={handleSubmitinquiry} modalContent={inquiryModalContent} />
      <Review_Modal isOpen={reviewModalOpen} onClose={closeReviewModal} onSubmit={handleSubmitreview} modalContent={reviewModalContent} />
      <GetReviewModal isOpen={checkReviewModalOpen} onClose={closeGetReviewModal} reviews={reviews} />
    </div>
  );
};


export default ProductDetail;
