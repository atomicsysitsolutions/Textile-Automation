'use client'
import * as React from "react";
import { useRouter } from 'next/navigation';
import style from "../css/style.css"
import { useState, useEffect } from 'react';
import Image from "next/image";
import img1 from "../../../../static/image25.png"
import img2 from "../../../../static/image_26.png"
import img3 from "../../../../static/image27.png"
import img4 from "../../../../static/image28.png"
import axios from 'axios';
export default function MyComponent(props) {
  const router = useRouter();
  const [vendorcount, setvendorCount] = useState(null);
  const [customercount, setcustomerCount] = useState(null);
  const [productcount, setproductCount] = useState(null);
  const [vendoraccounts, setvendoraccounts] = useState([]);

  useEffect(() => {
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
    const fetchCount = async () => {
      try {
        const response = await fetch('https://localhost:7159/api/Admin/Cutomercount');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setcustomerCount(data);
      } catch (error) {
        console.error("Could not fetch company profile count:", error);
      }
    };

    fetchCount();
  }, []);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('https://localhost:7159/api/Admin/Productcount');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setproductCount(data);
      } catch (error) {
        console.error("Could not fetch company profile count:", error);
      }
    };

    fetchCount();
  }, []);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('https://localhost:7159/api/Admin/GetVendorList');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setvendoraccounts(data);


      } catch (error) {
        console.error("Could not fetch company profile count:", error);
      }
    };

    fetchCount();
  }, []);

  const navigation = (url) => {

    router.push(url)
  };
  

  const handle_delete_Vendor = async (vendorId) => {
    try {
      const response = await axios.delete("https://localhost:7159/api/vendor/DeleteVendor", {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          vendorId: vendorId
        }

      });
      window.location.reload();
    } catch (error) {
      console.error("An error occurred", error.response);
    }
  };
  const handle_Approve_Vendor = async (vendorId) => {
    try {
      const response = await axios.post(`https://localhost:7159/api/Admin/ApproveVendor/${vendorId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          vendorId: vendorId
        }

      });
      window.location.reload();
    } catch (error) {
      console.error("An error occurred", error.response);
    }
  };

  const handleDownloadDocument = async (vendorId, vendorname) => {
    try {
      const response = await axios.get(`https://localhost:7159/api/Admin/GetVendorDocument/${vendorId}`, {
        responseType: 'blob',
      });

      const file = new Blob([response.data], { type: 'application/pdf' });


      const fileURL = URL.createObjectURL(file);


      const fileLink = document.createElement('a');


      fileLink.href = fileURL;
      fileLink.setAttribute('download', `${vendorname}.pdf`);


      document.body.appendChild(fileLink);


      fileLink.click();


      fileLink.parentNode.removeChild(fileLink);

    } catch (error) {
      console.error("Error during download", error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');

    router.push('/')
};
  return (
    <div style={{ maxHeight: '100vh', overflow: 'hidden' }}>

      <div className="flex flex-col justify-center bg-white">
        <div className="pr-5 w-full bg-white max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-start px-5 pt-5 pb-12 mx-auto w-full text-xs leading-3 bg-gray-800 max-md:mt-2.5" id="left_border">
                <div className="flex gap-2 ml-5 text-xs font-bold whitespace-nowrap max-md:ml-2.5" id="logo_cutomer">
                  <div className="justify-center items-center px-2 h-6 text-black bg-white rounded-full aspect-square" id="logo">
                    A
                  </div>
                  <div className="grow my-auto tracking-wide text-white">
                    Admin
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
                  <button onClick={() => navigation("/admin/vendor_account")} id="vendor_account_button"> Vendor Accounts </button>
                </div>
                <div className="flex gap-3 justify-between self-stretch mt-9 tracking-wide text-white" id="view_reply_background">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/711685df369a4aa7589319b322706f858744c37f36dcd85011386d999aa1f3dc?"
                    className="aspect-square w-[18px]"
                    id="view_reply_img"
                  />
                  <button onClick={() => navigation("/admin/customer_account")} id="customer_account_button"> Customer Accounts </button>
                </div>

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
                  <button className="grow"  onClick={() => handleLogout()}>Sign Out</button>
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

                    <div className="mt-2.5" id="user_text">User</div>
                    <Image
                      loading="lazy"
                      srcSet="..."
                      src={img4}
                      className="aspect-square w-[22px]"

                    />
                  </div>


                  <div className="mt-16 text-lg font-medium leading-6 text-blue-950 max-md:mt-10 max-md:max-w-full" id="dashboard_text">
                    Vendor Accounts
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
                              Total Customers
                            </div>
                            <div className="mt-3 text-3xl font-semibold tracking-tight leading-8 text-zinc-800">
                              {customercount}
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
                                Total Vendor
                              </div>
                              <div className="mt-3.5 text-3xl font-semibold tracking-tight leading-8 text-zinc-800">
                                {vendorcount}
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
                                Total Products
                              </div>
                              <div className="mt-3.5 text-3xl font-semibold tracking-tight leading-8 text-zinc-800">
                                {productcount}
                              </div>
                            </div>
                          </div>

                        </div>

                        <div id="customeraccountTable">
                          <div className="w-[269%] overflow-x-auto">
                            <div className="md:px-32 py-8 w-full">
                              <div className="shadow overflow-hidden rounded border-b border-gray-200">
                                <div className="max-h-[400px] overflow-y-auto">
                                  <table class="min-w-full bg-white">
                                    <thead class="bg-gray-800 text-white">
                                      <tr>
                                        <th scope="col" class="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">S/N</th>
                                        <th scope="col" class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                        <th scope="col" class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>

                                        <th scope="col" class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Phone Number</th>
                                        <th scope="col" class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Delete Customer</th>
                                        <th scope="col" class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Business Document</th>
                                        <th scope="col" class="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Vendor Approve</th>
                                      </tr>
                                    </thead>
                                    <tbody class="text-gray-700">
                                      {vendoraccounts.map((item, index) => (
                                        <tr key={index} class={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                          <td class="text-left py-3 px-4">{index + 1}</td>
                                          <td class="text-left py-3 px-4">{item.name}</td>
                                          <td class="text-left py-3 px-4">{item.email}</td>
                                          <td class="text-left py-3 px-4">{item.phoneNumber}</td>

                                          <td class="text-left py-3 px-4">
                                            <button onClick={() => handle_delete_Vendor(item.vendorId)} class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">Delete User</button>
                                          </td>
                                          <td class="text-left py-3 px-4">
                                            <button
                                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                              onClick={() => handleDownloadDocument(item.vendorId, item.name)}
                                            >
                                              Download
                                            </button>
                                          </td>
                                          <td class="text-left py-3 px-4">
                                            <button
                                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                              onClick={() => handle_Approve_Vendor(item.vendorId)}
                                            >
                                              Approve
                                            </button>
                                          </td>

                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>

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
          </div>
        </div>
      </div >
    </div>


  );
}

