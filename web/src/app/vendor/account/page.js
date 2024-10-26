'use client'
import * as React from "react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import style from "../css/vendor_style.css"
import { useState } from 'react';


import axios from 'axios';
import Image from "next/image";
import img1 from "../../../../static/image25.png"
import img2 from "../../../../static/image_26.png"
import img3 from "../../../../static/image27.png"
import img4 from "../../../../static/image28.png"
import useAuth from "../../useAuth.js"
import Copmany_Profiling_Modal from "../dashboard/profiling_modal.js"
import Add_product_modal from "../dashboard/Add_Product_Modal.js"

import ShowProductTable from "../dashboard/Show_product.js";
export default function MyComponent(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [vendoraccountData, setvendoraccountData] = useState([]);
    const { isAuthenticated, userRole } = useAuth();
    const [accountData, setaccountData] = useState([]);
    const [addproductModalOpen, setAddProductModalOpen] = useState(false);
    const [addproductModalContent, setAddProductModalContent] = useState(null);
    const [profilingModalOpen, setProfilingModalOpen] = useState(false);
    const [profilingModalContent, setProfilingModalContent] = useState(null);

    const router = useRouter();

    const navigation = (url) => {

        router.push(url)
    };



    useEffect(() => {
        const fetchprofile = async () => {
            try {
                const userObject1 = JSON.parse(localStorage.getItem('userId'));
                const userData = userObject1 ? userObject1.userId : '';


                const response = await axios.post('https://localhost:7159/api/get_item_for_vendor/GetVendorProfile', { VendorId: userData });
                setaccountData(response.data);
                console.log(response.data)

            } catch (error) {
                console.error("An error occurred while fetching the review count:", error);
            }
        };

        fetchprofile();
    }, []);




    const openProfilingModal = () => {
        const content = {
            title: "Copmany Profiling",
            fields: [

                { name: "CompanyName", label: "Company Name", type: "text" },
                { name: "Description", label: "Company Description", type: "text" },
                { name: "ExportMarket", label: "Export Market", type: "text" },
                { name: "Country", label: "Country", type: "text" }
            ]
        };
        setProfilingModalContent(content)
        setProfilingModalOpen(true);
    };

    const closeProfilingModal = () => {
        setProfilingModalOpen(false);
    };
    const handleSubmitprofiling = async () => {
        try {

            console.log("Company Profile submitted:");
        } catch (error) {
            console.error('Error submitting Profiling:', error);
        } finally {

            closeProfilingModal();
        }
    };

    const open_Add_Product_Modal = () => {
        const content = {
            title: "Copmany Profiling",
            fields: [

                {
                    name: "ProductName",
                    label: "Product Name",
                    type: "dropdown",
                    customClass: "w-3/4",
                    options: [
                        { value: 'cotton', label: 'Cotton', type: "text" },
                        { value: 'polyester', label: 'Polyester', type: "text" },]
                },

                {
                    name: "FabricType", label: "Fabric Type", type: "dropdown",
                    options: [
                        { value: 'cotton', label: 'Cotton', type: "text" },
                        { value: 'polyester', label: 'Polyester', type: "text" },]
                },

                {
                    name: "GSM", label: "GSM", type: "dropdown",
                    options: [
                        { value: 'cotton', label: 'Cotton', type: "text" },
                        { value: 'polyester', label: 'Polyester', type: "text" },]
                },
                {
                    name: "WeaveType", label: "Weave Type", type: "dropdown",
                    options: [
                        { value: 'cotton', label: 'Cotton', type: "text" },
                        { value: 'polyester', label: 'Polyester', type: "text" },]
                },
                {
                    name: "MaterialComposition", label: "Material Composition", type: "dropdown",
                    options: [
                        { value: 'cotton', label: 'Cotton', type: "text" },
                        { value: 'polyester', label: 'Polyester', type: "text" },]
                },
                {
                    name: "YarnType", label: "Yarn Type", type: "dropdown",
                    options: [
                        { value: 'cotton', label: 'Cotton', type: "text" },
                        { value: 'polyester', label: 'Polyester', type: "text" },]
                },
                {
                    name: "Cost", label: "Cost", type: "dropdown",
                    options: [
                        { value: 1, label: 1, type: "number" },
                    ]
                },

                {
                    name: "DeliveryTime", label: "Delivery Time", type: "dropdown",
                    options: [
                        { value: 1, label: 1, type: "number" },
                    ]
                },

                {
                    name: "MinimumOrder", label: "Minimum Order", type: "dropdown",
                    options: [
                        { value: 1, label: 1, type: "number" },
                    ]

                },
                { name: "CompanyId", label: "Company Id", type: "number" },
            ]
        };
        setAddProductModalContent(content);
        setAddProductModalOpen(true);
    };

    const close_Add_Product_Modal = () => {
        setAddProductModalOpen(false)
    };
    const handleSubmit_Add_Product = async (data) => {
        try {

            console.log("Product submitted:");
        } catch (error) {
            console.error('Error submitting Product:', error);
        } finally {

            close_Add_Product_Modal();
        }
    };


    const handleInputChange = (index, event) => {
        const newCustomerData = [...customeraccountData];
        newCustomerData[index][event.target.name] = event.target.value;
        setCustomeraccountData(newCustomerData);
    };

    return (

        <div className="flex flex-col justify-center bg-white">
            <div style={{ maxHeight: '100vh', overflow: 'hidden' }}>
                <div className="pr-5 w-full bg-white max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col grow items-start px-5 pt-5 pb-12 mx-auto w-full text-xs leading-3 bg-gray-800 max-md:mt-2.5" id="left_border">
                                <div className="flex gap-2 ml-5 text-xs font-bold whitespace-nowrap max-md:ml-2.5" id="logo_cutomer">
                                    <div className="justify-center items-center px-2 h-6 text-black bg-white rounded-full aspect-square" id="logo">
                                        V
                                    </div>
                                    <div className="grow my-auto tracking-wide text-white">
                                        Vendor
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
                                    <button onClick={() => navigation("/vendor/dashboard")} id="dashboard_button"> Dashboard </button>
                                </div>



                                <div className="flex gap-3 justify-between self-stretch mt-9 tracking-wide text-white" id="view_reply_background" style={{ position: 'relative', bottom: "3px" }}>
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/65df6d55aeea52d0299487bd98db78741a0e1c919ac5f71b006faa4bab429c8b?"
                                        className="aspect-square w-[18px]"
                                        id="view_reply_img"
                                    />
                                    <button onClick={() => openProfilingModal()} id="view_reply_button" style={{ position: 'relative', right: "43px" }}>Company Profiling</button>
                                </div>
                                <Copmany_Profiling_Modal isOpen={profilingModalOpen} onClose={closeProfilingModal} onSubmit={handleSubmitprofiling} modalContent={profilingModalContent} />

                                <div className="flex gap-3 justify-between self-stretch mt-9 tracking-wide text-white" id="view_reply_background" style={{ position: 'relative', bottom: "16px" }}>
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/65df6d55aeea52d0299487bd98db78741a0e1c919ac5f71b006faa4bab429c8b?"
                                        className="aspect-square w-[18px]"
                                        id="view_reply_img"
                                    />
                                    <button onClick={() => open_Add_Product_Modal()} id="view_reply_button" style={{ position: 'relative', right: "77px" }}>Add Product</button>
                                </div>
                                <Add_product_modal isOpen={addproductModalOpen} onClose={close_Add_Product_Modal} onSubmit={handleSubmit_Add_Product} modalContent={addproductModalContent} />
                                <div className="mt-52 ml-5 text-xs tracking-wider text-white max-md:mt-10 max-md:ml-2.5" id="other_text_v">
                                    OTHERS
                                </div>
                                <div id="options_v">
                                    <div className="flex gap-1.5 mt-7 ml-3 tracking-wide text-white whitespace-nowrap max-md:ml-2.5">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e5c52ff22270da87c3adb6084f211b204ba6d08aa6379184d4b345533abc0e8?"
                                            className="aspect-square w-[18px]"
                                        />
                                        <button onClick={() => navigation("/vendor/account")}> <div className="grow my-auto">Account</div></button>
                                    </div>
                                    <div className="flex gap-2 mt-4 ml-3 tracking-wide text-white whitespace-nowrap w-[52px] max-md:ml-2.5">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a737fa512db4512f9165f2b2e89971ba6d40c6b7f3977c284d1deb92e49bfd0?"
                                            className="flex-1 shrink-0 w-full aspect-square"
                                        />
                                        <button onClick={() => navigation("/vendor/help")}> <div>Help</div> </button>
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

                                        <div className="mt-2.5" id="user_text">{accountData.map((item) => (
                                            <div key={item.name}>{item.name}</div> // Ensure each name is wrapped in a div and returned
                                        ))}

                                        </div>
                                        <Image
                                            loading="lazy"
                                            srcSet="..."
                                            src={img4}
                                            className="aspect-square w-[22px]"

                                        />
                                    </div>


                                    <div className="mt-16 text-lg font-medium leading-6 text-blue-950 max-md:mt-10 max-md:max-w-full" id="dashboard_text">
                                        Account
                                    </div>
                                </div>
                                <div className="container mx-auto my-8 p-4 bg-white rounded-lg shadow-md"  style={{position:'relative',"bottom":165}}>
                                    <div className="flex flex-wrap md:flex-nowrap">
                                      
                                        <div className="flex-grow p-3">
                                          
                                            <div className="mb-6">
                                                <h2 className="text-lg font-semibold mb-4">Public Info</h2>
                                                <div className="flex flex-wrap -mx-3 mb-4">
                                                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
                                                            Username
                                                        </label>
                                                        <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="username" type="text" placeholder="Username" />
                                                    </div>
                                                    <div className="w-full md:w-1/2 px-3">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                                            Password
                                                        </label>
                                                        <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="password" type="password" placeholder="Password" />
                                                    </div>
                                                </div>
                                                
                                                <div className="flex flex-wrap -mx-3 mb-4">
                                                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
                                                            Email
                                                        </label>
                                                        <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="username" type="text" placeholder="Username" />
                                                    </div>
                                                    <div className="w-full md:w-1/2 px-3">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                                            Phone Number
                                                        </label>
                                                        <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="password" type="password" placeholder="Password" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap -mx-3 mb-4">
                                                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
                                                            New Password
                                                        </label>
                                                        <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="username" type="text" placeholder="Username" />
                                                    </div>
                                                  
                                                </div>
                                                <div className="flex justify-end">
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </div>


                                           
                                            <div className="mb-6">
                                                <h2 className="text-lg font-semibold mb-4">Public Info</h2>
                                                <div className="flex flex-wrap -mx-3 mb-4">
                                                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
                                                            Username
                                                        </label>
                                                        <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="username" type="text" placeholder="Username" />
                                                    </div>
                                                    <div className="w-full md:w-1/2 px-3">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                                            Password
                                                        </label>
                                                        <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="password" type="password" placeholder="Password" />
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap -mx-3 mb-4">
                                                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
                                                            Username
                                                        </label>
                                                        <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="username" type="text" placeholder="Username" />
                                                    </div>
                                                    <div className="w-full md:w-1/2 px-3">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                                            Password
                                                        </label>
                                                        <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="password" type="password" placeholder="Password" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-end">
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </div>


                                        </div>

                                       
                                        <div className="w-full md:w-auto px-3 md:px-6 mt-6 md:mt-0">
                                            <div className="flex justify-center md:justify-end">
                                                <div className="relative">
                                                    <div className="inline-block h-32 w-32 rounded-full overflow-hidden bg-gray-100">
                                                       
                                                    </div>
                                                    <button className="absolute bottom-0 right-0 mb-2 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full focus:outline-none focus:shadow-outline">
                                                        Upload
                                                    </button>
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
    );
}


