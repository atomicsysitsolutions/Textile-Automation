'use client'
import * as React from "react";
import { useRouter } from 'next/navigation';
import style from "../css/style.css"
import { useState } from 'react';
import Image from "next/image";
import img1 from "../../../../static/image25.png"
import img2 from "../../../../static/image_26.png"
import img3 from "../../../../static/image27.png"
import img4 from "../../../../static/image28.png"

export default function MyComponent(props) {
  const [isOpen, setIsOpen] = useState(false);
  const router=useRouter();
  const navigation=(url)=>{
     
    router.push(url)
  };
  return (
    <div className="flex flex-col justify-center bg-white">
      <div className="pr-5 w-full bg-white max-md:max-w-full" >
        <div className="flex gap-5 max-md:flex-col max-md:gap-0" >
          <div className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full"  >
            <div className="flex flex-col grow items-start px-5 pt-5 pb-12 mx-auto w-full text-xs leading-3 bg-gray-800 max-md:mt-2.5" id="left_border" >
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
                <button  onClick={()=>navigation("/customer/dashboard")} id="dashboard_button"> Dashboard </button>
              </div>
              <div className="flex gap-3 justify-between self-stretch mt-9 tracking-wide text-white" id="view_reply_background">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/711685df369a4aa7589319b322706f858744c37f36dcd85011386d999aa1f3dc?"
                  className="aspect-square w-[18px]"
                  id="view_reply_img"
                />
                <button onClick={()=>navigation("/customer/view_reply")}  id="view_reply_button"> View Reply </button>
              </div>
              <div className="flex gap-4 justify-between self-stretch px-px mt-5 font-medium tracking-normal text-white">
                <div className="flex flex-col flex-1">
                  <div className="flex gap-2 justify-between whitespace-nowrap">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4dae441b56abb7a7a24928571a1291b68594ff08f01f0b9d0b055e477c33595?"
                      className="aspect-square w-[18px]"
                      id="product_detail_img"
                    />
                    <button className="grow self-start mt-2"  id="product_detail_button">Product Detail</button>
                  </div>
                  <div className="flex flex-col pl-12 mt-3.5 max-md:pl-5">
                  <div  className={`mt-2 whitespace-nowrap ${isOpen ? 'block' : 'hidden'}`}>New Product</div>
                  <div className={`mt-4 whitespace-nowrap ${isOpen ? 'block' : 'hidden'}`}>
                    Existing Product
                  </div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2b95db225e96d6abbb8ea8050a7da4ec3d8b2763a919f0ff8f2db8d5c3d532c?"
                  className="self-start mt-2 w-2.5 aspect-[1.67] stroke-[2px] stroke-slate-400 cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                  id="product_drop_down"
                />
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
                <button onClick={()=>navigation("/customer/account")}> <div className="grow my-auto">Account</div></button>
              </div>
              <div className="flex gap-2 mt-4 ml-3 tracking-wide text-white whitespace-nowrap w-[52px] max-md:ml-2.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a737fa512db4512f9165f2b2e89971ba6d40c6b7f3977c284d1deb92e49bfd0?"
                  className="flex-1 shrink-0 w-full aspect-square"
                />
                <button onClick={()=>navigation("/customer/help")}> <div>Help</div> </button>
              </div>
              <div className="flex gap-2 mt-5 ml-4 text-white whitespace-nowrap max-md:ml-2.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ec60f18ee978d710921e3e8a15c6bbf6733b0ceb170c1d85462af6ab9d402ee?"
                  className="aspect-[1.08] fill-slate-400 w-[15px]"
                />
                 <button className="grow" onClick={()=>navigation("/")}>Sign Out</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start mt-4 max-md:mt-6 max-md:max-w-full">
              <div className="flex flex-col ml-8 max-w-full tracking-wide whitespace-nowrap w-[625px]">
              <label htmlFor="search" className="flex items-center">
              <div style={{position: "relative"}}>
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
                  style={{pointerEvents: "none"}}
                  id="search_icon"
                />
              </div>
              </label>


                  <div className="flex gap-5 items-start self-start px-px mt-2 text-xs text-neutral-500" id="icon_pic">
                <Image
                  loading="lazy"
                  srcSet="..."
                  src={img1}
                  className="aspect-square w-[22px]"
                />
                <Image
                  loading="lazy"
                  srcSet="..."
                  src={img2}
                  className="self-stretch aspect-[0.95] w-[22px]"
                />
                <Image
                  loading="lazy"
                  srcSet="..."
                  src={img3}
                  className="aspect-square w-[22px]"
                />
                <div className="mt-2.5" id="user_text">User</div>
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
                    <div className="flex flex-col max-md:mt-10">
                    
                     
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


