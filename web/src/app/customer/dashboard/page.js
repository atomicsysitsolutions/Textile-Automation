'use client'
import * as React from "react";

import { useRouter } from 'next/navigation';
import style from "../css/customer_style.css"
import { useState } from 'react';
import Image from "next/image";
import img1 from "../../../../static/image25.png"
import img2 from "../../../../static/image_26.png"
import img3 from "../../../../static/image27.png"
import img4 from "../../../../static/image28.png"
import Modal from './Existing_Product_Modal.js';
import Modal1 from './New_Product_Modal';
import ExistingProductTable from "./ExistingProductTable";
import NewProductTable from "./New_Product_Table";
import GetViewReplyModal from "../view_reply/page.js";
import { useEffect } from 'react';
import useAuth from "../../useAuth.js"
import axios from 'axios';
export default function MyComponent(props) {
  const { isAuthenticated, userRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isExisting_ProductModalOpen, setExisting_ProductIsModalOpen] = useState(false);
  const [Existing_ProductmodalContent, setExisting_ProductModalContent] = useState(null);
  const [existingTableData, setExistingTableData] = useState([]);


  const [isNew_ProductModalOpen, setNew_ProductIsModalOpen] = useState(false);
  const [New_ProductmodalContent, setNew_ProductModalContent] = useState(null);
  const [currentTable, setCurrentTable] = useState('existing');

  const [newTableData, setNewTableData] = useState([]);

  const [tableData, setTableData] = useState([]);

  const [vendorcount, setvendorCount] = useState(null);
  const [Reviewrcount, setReviewCount] = useState(null);
  const [Inquirycount, setInquiryCount] = useState(null);
  const [customeraccountData, setcustomeraccountData] = useState([]);

  const [replyreview, setReplyreview] = useState([]);
  const [checkReplyReviewModalOpen, setCheckReplyReviewModalOpen] = useState(false);



  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('userId') || '{}');
      if (userData.userId) {
        const existingDataKey = `existingTableData_${userData.userId}`;
        const storedExistingTableData = localStorage.getItem(existingDataKey);

        if (storedExistingTableData) {
          setExistingTableData(JSON.parse(storedExistingTableData));
        }
      }
    } catch (error) {
      console.error("Error loading or parsing existing table data:", error);
    }
  }, []);


  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('userId') || '{}');
      if (userData.userId) {
        const newTableDataKey = `newTableData_${userData.userId}`;
        const storedNewTableData = localStorage.getItem(newTableDataKey); // Corrected variable name

        if (storedNewTableData) {
          setNewTableData(JSON.parse(storedNewTableData)); // Corrected function to set new table data
        }
      }
    } catch (error) {
      console.error("Error loading or parsing new table data:", error); // Corrected error message
    }
  }, []);



  useEffect(() => {
    // Replace 'your-api-url' with the actual URL where your backend is hosted
    const fetchCount = async () => {
      try {
        const response = await fetch('https://localhost:7159/api/get_item/vendorcount');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setvendorCount(data);
      } catch (error) {
        console.error("Could not fetch company profile count:", error);
      }
    };

    fetchCount();
  }, []);

  useEffect(() => {
    const fetchReviewCount = async () => {
      try {
        const userObject1 = JSON.parse(localStorage.getItem('userId'));
        const userData = userObject1 ? userObject1.userId : '';

        console.log(userData)
        const response = await axios.post('https://localhost:7159/api/get_item/UserReviewsCount', { UserId: userData });
        setReviewCount(response.data);
      } catch (error) {
        console.error("An error occurred while fetching the review count:", error);
        setReviewCount('Error');
      }
    };

    fetchReviewCount();
  }, []);

  useEffect(() => {
    const fetchReviewCount = async () => {
      try {
        const userObject1 = JSON.parse(localStorage.getItem('userId'));
        const userData = userObject1 ? userObject1.userId : '';


        const response = await axios.post('https://localhost:7159/api/get_item/UserInquiryCount', { UserId: userData });
        setInquiryCount(response.data);
      } catch (error) {
        console.error("An error occurred while fetching the review count:", error);
        setInquiryCount('Error');
      }
    };

    fetchReviewCount();
  }, []);


  const openGetReplyReviewModal = async () => {
    try {
        const userObject1 = JSON.parse(localStorage.getItem('userId'));
        const userData = userObject1 ? userObject1.userId : '';
        const response = await axios.post('https://localhost:7159/api/get_item/getVendorreplies',  { UserId: userData });
        setReplyreview(response.data);
        setCheckReplyReviewModalOpen(true);
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
};

const closeGetReplyReviewModal = () => {
  setCheckReplyReviewModalOpen(false);
};


  const open_Existing_Product_Modal = (content) => {
    setExisting_ProductModalContent(content);
    setExisting_ProductIsModalOpen(true);
  };

  const closeExisting_ProductModal = () => {
    setExisting_ProductIsModalOpen(false);

  };
  const handleSubmit_Existing_Product = (data) => {
    const userData = JSON.parse(localStorage.getItem('userId'));
    if (userData) {
      const existingDataKey = `existingTableData_${userData.userId}`;
      localStorage.setItem(existingDataKey, JSON.stringify(data));
      setExistingTableData(data); // Ensure this updates the correct state
    }
    closeExisting_ProductModal();
  };



  const open_New_Product_Modal = (content) => {
    setNew_ProductModalContent(content);
    setNew_ProductIsModalOpen(true);
  };

  const close_New_ProductModal = () => {
    setNew_ProductIsModalOpen(false);

  };
  const handleSubmit_New_Product = (data) => {
    const userData = JSON.parse(localStorage.getItem('userId'));
    if (userData) {
      const newTableDataKey = `newTableData_${userData.userId}`; // Corrected key prefix
      localStorage.setItem(newTableDataKey, JSON.stringify(data));
      setNewTableData(data);
    }
    close_New_ProductModal();
  };



  const showExistingTable = () => {

    setCurrentTable('existing');
  };

  const showNewTable = () => {

    setCurrentTable('new');
  };






  const navigation = (url) => {

    router.push(url)
  };

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      try {
        const userObject1 = JSON.parse(localStorage.getItem('userId'));
        const userData = userObject1 ? userObject1.userId : '';

        console.log(userData);
        const response = await axios.post('https://localhost:7159/api/get_item/GetCustomerProfile', { UserId: userData });
        setcustomeraccountData(response.data);
       
      } catch (error) {
        console.error("An error occurred while fetching the review count:", error);
      }
    };

    fetchCustomerProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');

    router.push('/')
  };


  useEffect(() => {
    // Check authentication and user role here
    if (!isAuthenticated) {
      router.push('/customer/dashboard');
    } else if (userRole !== 'Customer') {
      router.push('/vendor/dashboard'); // Redirect vendor to customer dashboard
    }
  }, [isAuthenticated, userRole]);


  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxHeight: '100vh', overflow: 'hidden' }}>
      <div className="flex flex-col justify-center bg-white ">
        <div className="pr-5 w-full bg-white max-md:max-w-full ">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full ">
              <div className="flex flex-col grow items-start px-5 pt-5 pb-12 mx-auto w-full text-xs leading-3 bg-gray-800 max-md:mt-2.5" id="left_border">
                <div className="flex gap-2 ml-5 text-xs font-bold whitespace-nowrap max-md:ml-2.5" id="logo_cutomer">
                  <div className="justify-center items-center px-2 h-6 text-black bg-white rounded-full aspect-square" id="logo">
                    C
                  </div>
                  <div className="grow my-auto tracking-wide text-white">
                    Customer
                  </div>
                </div>
                <div className="mt-16 ml-5 text-xs tracking-wider text-white max-md:mt-10 max-md:ml-2.5" id="menu_text">
                  MENU
                </div>
                <div className="flex gap-3 justify-between self-stretch px-5 py-3 mt-3.5 font-medium tracking-wide text-white whitespace-nowrap bg-white rounded-md" id="dashboard_background">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4dea805091487e64057ad356edf40b6d524aef27f8b90e67dcc0aea41d28c9a2?"
                    className="aspect-square w-[18px]"
                  />
                  <button onClick={() => navigation("/customer/dashboard")} id="dashboard_button"> Dashboard </button>
                </div>
                <div className="flex gap-3 justify-between self-stretch mt-9 tracking-wide text-white" id="view_reply_background">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/711685df369a4aa7589319b322706f858744c37f36dcd85011386d999aa1f3dc?"
                    className="aspect-square w-[18px]"
                    id="view_reply_img"
                  />
                  <button onClick={() => openGetReplyReviewModal()} id="view_reply_button"> View Reply </button>
                  
                </div>
                <GetViewReplyModal isOpen={checkReplyReviewModalOpen} onClose={closeGetReplyReviewModal} replyreview={replyreview} />
                <div className="flex gap-4 justify-between self-stretch px-px mt-5 font-medium tracking-normal text-white">
                  <div className="flex flex-col flex-1">
                    <div className="flex gap-2 justify-between whitespace-nowrap">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4dae441b56abb7a7a24928571a1291b68594ff08f01f0b9d0b055e477c33595?"
                        className="aspect-square w-[18px]"
                        id="product_detail_img"
                      />
                      <button className="grow self-start mt-2" id="product_detail_button">Product Detail</button>
                    </div>
                    <div className="flex flex-col pl-12 mt-3.5 max-md:pl-5 product_detail">
                      <button className={`mt-3 whitespace-nowrap newproduct_button ${isOpen ? 'block' : 'hidden'}`} onClick={() => open_New_Product_Modal({
                        title: "New Product", fields: [
                          { name: "MaterialComposition", label: "Material Composition", type: "text" },
                          { name: "Fabrictype", label: "Fabric type", type: "text" },
                          { name: "Weavetype", label: "Weave type", type: "text" },
                          { name: "MinOrder", label: "Min Order", type: "text" },
                          { name: "ExportMarket", label: "Export Market", type: "text" },
                          { name: "Price", label: "Cost", type: "text" },
                          { name: "DeliveryTime", label: "Delivery Time", type: "text" }
                        ]
                      })} >New Product</button>

                      <button className={`mt-2 whitespace-nowrap ${isOpen ? 'block' : 'hidden'}`} onClick={() => open_Existing_Product_Modal({
                        title: "Existing Product", fields: [
                          { name: "ProductName", label: "Name", type: "text" },
                          { name: "Cost", label: "Cost", type: "text" },
                          { name: "DeliveryTime", label: "Delivery Time", type: "text" }
                        ]
                      })}>
                        Existing Product
                      </button>




                    </div>
                    <Modal isOpen={isExisting_ProductModalOpen} onClose={closeExisting_ProductModal} onSubmit={handleSubmit_Existing_Product} modalContent={Existing_ProductmodalContent} />
                    <Modal1 isOpen={isNew_ProductModalOpen} onClose={close_New_ProductModal} onSubmit={handleSubmit_New_Product} modalContent={New_ProductmodalContent} />


                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2b95db225e96d6abbb8ea8050a7da4ec3d8b2763a919f0ff8f2db8d5c3d532c?"
                    className="self-start mt-2  aspect-[1.67] stroke-[2px] stroke-slate-400 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                </div>
                <div id="options_c">
                <div className="mt-52 ml-5 text-xs tracking-wider text-white max-md:mt-10 max-md:ml-2.5" id="other_text">
                  OTHERS
                </div>
                <div className="flex gap-1.5 mt-7 ml-3 tracking-wide text-white whitespace-nowrap max-md:ml-2.5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e5c52ff22270da87c3adb6084f211b204ba6d08aa6379184d4b345533abc0e8?"
                    className="aspect-square w-[18px]"
                  />
                  <button onClick={() => navigation("/customer/account")}> <div className="grow my-auto">Account</div></button>
                </div>
                <div className="flex gap-2 mt-4 ml-3 tracking-wide text-white whitespace-nowrap w-[52px] max-md:ml-2.5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a737fa512db4512f9165f2b2e89971ba6d40c6b7f3977c284d1deb92e49bfd0?"
                    className="flex-1 shrink-0 w-full aspect-square"
                  />
                  <button onClick={() => navigation("/customer/help")}> <div>Help</div> </button>
                </div>
                <div className="flex gap-2 mt-5 ml-4 text-white whitespace-nowrap max-md:ml-2.5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ec60f18ee978d710921e3e8a15c6bbf6733b0ceb170c1d85462af6ab9d402ee?"
                    className="aspect-[1.08] fill-slate-400 w-[15px]"
                  />
                  <button className="grow" onClick={() => handleLogout()}>Sign Out</button>
                </div>
                </div>
              
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col items-start mt-4 max-md:mt-6 max-md:max-w-full">
                <div className="flex flex-col ml-8 max-w-full tracking-wide whitespace-nowrap w-[625px]">
                  <label htmlFor="search" className="flex items-center">
                    <div style={{ position: "relative" }}>
                      <input
                        id="search"
                        className="flex gap-5 justify-between px-4 py-2.5 text-xs leading-3 text-white bg-gray-600 rounded-md max-md:flex-wrap max-md:max-w-full"
                        type="text"
                        placeholder="Search"

                      />

                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e6bb115f0d4b7130ae6bd0f17400d462afd62d263f00acee8b37aad3b33ff6ff?"
                        className="w-3 aspect-square absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
                        style={{ pointerEvents: "none" }}
                        id="search_icon"
                      />
                    </div>
                  </label>


                  <div className="flex gap-5 items-start self-start px-px mt-2 text-xs text-neutral-500" id="icon_pic">
                
                    <div className="mt-2.5" id="user_text">

                    <div className="mt-2.5" id="user_text">{customeraccountData.map((item) => (
                                            <div key={item.userName}>{item.userName}</div> // Ensure each name is wrapped in a div and returned
                                        ))}

                                        </div>
                    </div>
                    <Image
                      loading="lazy"
                      srcSet="..."
                      src={img4}
                      className="aspect-square w-[22px]"

                    />
                  </div>


                  <div className="mt-16 text-lg font-medium leading-6 text-blue-950 max-md:mt-10 max-md:max-w-full" id="dashboard_text">
                    Dashboard
                  </div>
                </div>
                <div className="mt-10 max-w-full w-[791px]">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[35%] max-md:ml-0 max-md:w-full">



                      <div className="flex flex-col max-md:mt-10" id="Total_inquires">
                        <div className="flex gap-3 justify-between items-start whitespace-nowrap">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/31e78797d3fa2b3d261d0e2241997cafb9603e162e005a6590951aa8d394e582?"
                            className="max-w-full aspect-[1.22] w-[103px]"
                          />
                          <div className="flex flex-col flex-1">
                            <div className="text-sm tracking-normal text-neutral-400">
                              Total inquires
                            </div>
                            <div className="mt-3 text-3xl font-semibold tracking-tight leading-8 text-zinc-800">
                              {Inquirycount}
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[65%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow mt-1.5 whitespace-nowrap max-md:mt-10 max-md:max-w-full">
                        <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                          <div className="flex gap-1.5 justify-between items-start" id="Product_Review">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a36861b4875c4c4f93ba47dda47ed9fac091ee35beb4f7d730de05f8600f9a3?"
                              className="max-w-full aspect-[1.22] w-[103px]"
                            />
                            <div className="flex flex-col flex-1">
                              <div className="text-sm tracking-normal text-neutral-400">
                                Total Reviews
                              </div>
                              <div className="mt-3.5 text-3xl font-semibold tracking-tight leading-8 text-zinc-800">
                                {Reviewrcount}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-3 self-start" id="Total_vendors">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/602ad64919875aa36544944df07c83e2a590f7c3efd83a360cb48c4db8ba62a2?"
                              className="max-w-full aspect-[1.22] w-[103px]"
                            />
                            <div className="flex flex-col flex-1 self-start mt-1.5">
                              <div className="text-sm tracking-normal text-neutral-400">
                                Total vendors
                              </div>
                              <div className="mt-3.5 text-3xl font-semibold tracking-tight leading-8 text-zinc-800">
                                {vendorcount}
                              </div>
                            </div>
                          </div>

                        </div>



                        <div>

                          <div id="product_table">
                            <div className="existing_new_Button">

                              <button onClick={showExistingTable} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  mx-2">
                                Existing Product
                              </button>

                              <button onClick={showNewTable} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2">
                                New Product
                              </button>

                            </div>

                            <div>

                              {currentTable === 'existing' && <ExistingProductTable key="existing" tableData={existingTableData} />}
                              {currentTable === 'new' && <NewProductTable key="new" tableData={newTableData} />}

                            </div>



                          </div>


                        </div>


                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >


    </div>













  );
}

