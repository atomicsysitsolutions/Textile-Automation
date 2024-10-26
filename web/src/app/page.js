'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import img1 from "../../static/hero-bg.png";
import img2 from "../../static/profile.png";
import img3 from "../../static/serach.png";
import img4 from "../../static/animation.png";
import img5 from "../../static/image4.png";
import img6 from "../../static/image5.png";
import img7 from "../../static/image6.png";
import img8 from "../../static/about_image.png";
import img9 from "../../static/Choose_us_img1.png";
import img10 from "../../static/Choose_us_img2.png";
import img11 from "../../static/Choose_us_img3.png";
import img12 from "../../static/web_logo.png";
import img13 from "../../static/message.png";
import img14 from "../../static/call.png";
import img15 from "../../static/fb.png";
import img16 from "../../static/instagram.png";
import img17 from "../../static/twitter.png";
import img18 from "../../static/linkedin.png";

export default function Home() {
  const router=useRouter();
  
  const navigation=(url)=>{
   
    router.push(url)
  };

  const scrolltopage=(url)=>{
   
    if (url.startsWith('#')) {
      const sectionRef = document.querySelector(url);
      if (sectionRef) {
        return sectionRef.scrollIntoView({ behavior: 'smooth' });
      }
    }
    router.push(url);
  
  };
 
  
  return (
   
      <div className="flex flex-col bg-white">
      <div className="flex overflow-hidden relative flex-col pb-12 w-full min-h-[993px] max-md:max-w-full" >
        <Image
          loading="lazy"
          src={img1}
          srcSet=""
          className="object-cover absolute inset-0 size-full"
         
        />
       <div className="flex fixed top-0 z-50 gap-5 justify-between items-start px-7 py-6 w-full text-lg text-white max-md:flex-wrap max-md:px-5 max-md:max-w-full" style={{ backgroundColor: 'rgba(23, 13, 89, 0.56)' }}>



          <div className="grow my-auto text-3xl font-semibold whitespace-nowrap">
            PRIMA TEXTILE
          </div>
          <div className="flex gap-5 justify-between my-auto max-md:flex-wrap max-md:max-w-full">
            <button><div className="grow" onClick={() => scrolltopage('#home')}>HOME</div></button>
            <button><div onClick={() => scrolltopage('#services')}>SERVICES</div></button>
            <button><div onClick={() => scrolltopage('#aboutus')}>ABOUT</div></button>
            <button><div onClick={() => scrolltopage('#chooseus')}>WHY US</div></button>
            <button><div className="grow whitespace-nowrap" onClick={() => scrolltopage('#contactus')}>CONTACT US</div></button>
          </div>
          <div className="flex gap-1 self-start whitespace-nowrap">
          <Link href="/login">
            <Image
              loading="lazy"
              src={img2}
              srcSet="..."
              className="aspect-square w-[33px] h-[33px]"
            />
          </Link>
          <div className="mt-1 text-lg">
          <button onClick={()=>navigation("/login")}>LOGIN</button>
          </div>
          </div>
          <Image
            loading="lazy"
            src={img3}
            srcSet="..."
            className="self-start aspect-square w-[31px]"
          />
        </div>
        <div className="relative self-center mt-20 mb-32 w-full max-w-[1277px] max-md:my-10 max-md:max-w-full" id="home" style={{margin:160}}>
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex relative flex-col mt-16 font-semibold text-white max-md:mt-10 max-md:max-w-full">
                <div className="text-5xl max-md:max-w-full max-md:text-4xl" style={{position:"relative",right:10}}>
                  TEXTILE TECH
                </div>
                <div className="mt-10 text-xl max-md:max-w-full">
                  Textile technology/Engineering deals with the application of
                  scientific and engineering principles to the design and
                  control of all aspects of fiber, textile and apparel
                  processes, its products and machinery.
                </div>
                <div
              className="justify-center self-start px-5 py-3 mt-12 text-xl whitespace-nowrap bg-sky-500 max-md:px-5 max-md:mt-10"
             
            >
              Read More
            </div>
              </div>
            </div>
       
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full" style={{position:"relative",left:70}}>
            <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
>
  <motion.div
    animate={{
      y: [0, -25, 0, 25, 0],
      transition: {
        yoyo: Infinity,
        duration: 20,
        ease: "linear", // Use linear easing for continuous movement
      },
    }}
    className="relative"
  >
    <Image
      loading="lazy"
      src={img4}
      srcSet="..."
      className="grow w-full aspect-[1.16] max-md:mt-10 max-md:max-w-full"
    />
  </motion.div>
</motion.div>


            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 self-center px-5 mt-20 text-4xl font-bold max-md:mt-10" id="services">
        <div className="text-sky-950">Our </div>
        <div className="flex-auto text-sky-500">Services</div>
      </div>
      <div className="mt-16 mr-11 ml-11 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-center py-5 w-full bg-stone-50 max-md:mt-10">
              <Image
                loading="lazy"
                src={img5}
                srcSet="..."
                className="aspect-square w-[87px]"
              />
              <div className="mt-7 text-xl whitespace-nowrap text-sky-950">
                AI SUGGESTION
              </div>
              <div className="flex flex-col self-stretch pr-2 pl-6 mt-9 max-md:pl-5">
                <div className="text-xl text-black">
                  Auto-suggestions can be anything relevant to the user input as
                  per bot asked query. For instance, when a chatbot asks users
                  to select a nearby car dealer, then Auto-suggestion can be
                  used to display the same.
                </div>
                <div className="justify-center self-end px-4 py-2 mt-24 mr-5 text-xl text-white whitespace-nowrap bg-sky-500 max-md:pr-5 max-md:mt-10 max-md:mr-2.5">
                  Read More
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center pl-3.5 w-full bg-stone-50 max-md:mt-10">
              <div className="flex flex-col px-6 pt-7 pb-5 bg-stone-50 max-md:px-5">
                <Image
                  loading="lazy"
                  src={img6}
                  srcSet="..."
                  className="self-center aspect-square w-[87px]"
                />
                <div className="self-center mt-5 text-xl whitespace-nowrap text-sky-950">
                  SUGGESTION OF Vendor{" "}
                </div>
                <div className="mt-9 text-xl text-black">
                  The Suggestion System is a system used to collect and evaluate
                  ideas and suggestions from employees. Encourages employees to
                  offer ideas and suggestions on how they can improve the
                  company's processes, products, services and operations.
                </div>
                <div className="justify-end self-end px-4 py-2 mt-14 text-xl text-white whitespace-nowrap bg-sky-500 max-md:pr-5 max-md:mt-10">

                  Read More
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow py-5 pr-4 pl-9 w-full text-xl bg-stone-50 max-md:pl-5 max-md:mt-10">
              <Image
                loading="lazy"
                src={img7}
                srcSet="..."
                className="self-center aspect-square w-[87px]"
              />
              <div className="self-center mt-6 whitespace-nowrap text-sky-950">
                CONTACT VENDORS
              </div>
              <div className="mt-16 text-black max-md:mt-10">
                A Vendor Contact defines the communications end-point (contact).
                Although the contact may be a group like Customer Support., it
                is normally a person. For some purposes, the contact must be a
                person.
              </div>
              <div className="justify-center self-end px-4 py-2 mt-16 text-xl text-white whitespace-nowrap bg-sky-500 max-md:pr-5 max-md:mt-10">
                Read More
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-16 py-12 mt-24 w-full bg-sky-950 max-md:px-5 max-md:mt-10 max-md:max-w-full" id="aboutus" >
        <div className="flex gap-5 justify-between self-center text-4xl font-bold whitespace-nowrap">
          <div className="text-white">About</div>
          <div className="text-sky-500">Us</div>
        </div>
        <div className="mt-20 mr-4 mb-12 max-md:my-10 max-md:mr-2.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
              <Image
                loading="lazy"
                src={img8}
                srcSet="..."
                className="grow w-[600px] h-[200px] aspect-[1.61] max-md:mt-10 max-md:max-w-full"
              />
            </div>
            <div className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow mt-9 text-2xl text-white max-md:mt-10 max-md:max-w-full">
                <div className="text-4xl font-semibold max-md:max-w-full">
                  We Are Prima Textile
                </div>
                <div className="mt-14 max-md:mt-10 max-md:max-w-full">
                  The textile industry is primarily concerned with the design,
                  production and distribution of textiles: yarn, cloth and
                  clothing. The raw material may be natural, or synthetic using
                  products of the chemical industry.
                </div>
                <div className="justify-center self-start px-4 py-3 mt-16 whitespace-nowrap bg-sky-500 max-md:px-5 max-md:mt-10">
                  Read More
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 self-center px-5 mt-20 text-4xl font-bold text-sky-950 max-md:mt-10" id="chooseus" >
        <div className="grow">Why </div>
        <div className="flex-auto">Choose </div>
        <div className="text-sky-500">Us</div>
      </div>
      <div className="mx-11 mt-14 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-7 pt-8 pb-4 w-full bg-stone-50 max-md:pl-5 max-md:mt-10">
              <div className="flex justify-center items-center self-center p-7 max-w-full rounded-full stroke-[4px] w-[152px] max-md:px-5">
              <Image
                  loading="lazy"
                  src={img9}
                  srcSet="..."
                  className="w-full aspect-square"
                />
              </div>
              <div className="self-center mt-6 text-2xl font-semibold whitespace-nowrap text-sky-950">
              Expert Manegement
              </div>
              <div className="mt-12 text-xl text-black max-md:mt-10">
              Employee Expertise Management means formally organizing and
               classifying employee skills and expertise and 
               exposing that information for use within an organization.
              </div>
            <div className="justify-center self-end px-4 py-2 mt-32 text-xl text-white whitespace-nowrap bg-sky-500 max-md:px-5 max-md:mt-10">
               Read More
</div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-7 pt-8 pb-4 w-full bg-stone-50 max-md:pl-5 max-md:mt-10">
              <div className="flex justify-center items-center self-center p-7 max-w-full rounded-full stroke-[4px] w-[152px] max-md:px-5">
                <Image
                  loading="lazy"
                  src={img10}
                  srcSet="..."
                  className="w-full aspect-square"
                />
              </div>
              <div className="self-center mt-6 text-2xl font-semibold whitespace-nowrap text-sky-950">
                Happy Customer
              </div>
              <div className="mt-12 text-xl text-black max-md:mt-10">
                Customer happiness is the level of satisfaction customers
                experience after interacting with your company, product, or
                service. A truly happy customer is so confident in your ability
                to meet their needs quickly and effectively that they don't
                hesitate to recommend your brand to others
              </div>
              <div className="justify-center self-end px-4 py-2 mt-12 text-xl text-white whitespace-nowrap bg-sky-500 max-md:px-5 max-md:mt-10">
                Read More
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-5 py-7 w-full bg-stone-50 max-md:mt-10">
              <div className="flex justify-center items-center self-center p-7 max-w-full rounded-full stroke-[4px] w-[152px] max-md:px-5">
                <Image
                  loading="lazy"
                  src={img11}
                  srcSet="..."
                  className="w-full aspect-square"
                />
              </div>
              <div className="self-center mt-6 text-2xl font-semibold whitespace-nowrap text-sky-950">
                Suitable Raw Material
              </div>
              <div className="mt-14 text-xl text-black max-md:mt-10">
                Research sustainable materials: Look for clothing made from
                organic cotton, linen, hemp, bamboo, recycled polyester, or
                Tencel. These materials are often grown or produced using fewer
                resources and chemicals than conventional materials.
              </div>
              <div className="justify-center self-end px-4 py-2 mt-24 text-xl text-white whitespace-nowrap bg-sky-500 max-md:px-5 max-md:mt-30">
                Read More
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-between items-start pt-5 pr-20 pb-12 pl-9 mt-14 w-full bg-sky-950 max-md:flex-wrap max-md:px-5 max-md:mt-10 max-md:max-w-full" id="contactus">
        <div className="flex flex-col self-start">
          <div className="flex gap-2.5 justify-between items-center text-4xl font-bold">
            <Image
              loading="lazy"
              src={img12}
              srcSet="..."
              className="self-stretch aspect-square w-[54px]"
            />
            <div className="self-stretch my-auto text-white">Prima </div>
            <div className="flex-auto self-stretch my-auto text-sky-500">
              Textile
            </div>
          </div>
          <div className="flex flex-col pl-4 mt-8 text-white ">
            <div className="text-4xl font-bold">Info</div>
            <div className="mt-10 text-xl" style={{width:600,height:50}}>
              Customer happiness is the level of satisfaction customers
              experience after interacting with your company, product, or
              service. A truly happy customer is so confident in your ability to
              meet their needs quickly and effectively that they don't hesitate
              to recommend your brand to others
            </div>
          </div>
        </div>
        <div className="flex flex-col self-end mt-20 whitespace-nowrap max-md:mt-10">
          <div className="flex gap-3 justify-between" >
            <div className="flex flex-col flex-1 text-2xl font-semibold text-white">
              <div className="text-4xl font-bold">Quick</div>
              <button><div className="mt-10" onClick={() => scrolltopage('#home')}>Home</div></button>
              <button><div className="mt-7" onClick={() => scrolltopage('#aboutus')}>About</div></button>
            </div>
            <div className="grow self-start text-4xl font-bold text-sky-500">
              Links
            </div>
          </div>
      
          <button><div className="mt-7 text-2xl font-semibold text-white" onClick={() => scrolltopage('#services')} style={{position:"relative",right:38}}>Services</div></button>
          <button><div className="mt-9 text-2xl font-semibold text-white" onClick={() => scrolltopage('#chooseus')} style={{position:"relative",left:5}}>
            Why Choose Us
          </div></button>
        </div>
        <div className="flex flex-col my-auto" style={{position:"relative",right:76}}>
          <div className="flex gap-4 justify-between text-4xl font-bold"  style={{position:"relative",top:26}}>
            <div className="grow text-white">Contact </div>
            <div className="text-sky-500">Us</div>
          </div>
          <div className="flex gap-1.5 justify-between mt-11 text-xl font-semibold text-white whitespace-nowrap max-md:mt-10" style={{position:"relative",top:26}}>
            <Image
              loading="lazy"
              src={img13}
              srcSet="..."
              className="aspect-[1.06] w-[33px]"
            />
            <div className="grow my-auto">prima@gmail.com</div>
          </div>
          <div className="flex gap-2 justify-between mt-12 text-xl font-semibold text-white whitespace-nowrap max-md:mt-10" style={{position:"relative",top:6}}>
            <Image
              loading="lazy"
              src={img14}
              srcSet="..."
              className="aspect-square w-[33px]"
            />
            <div className="grow my-auto">Call 2123-321-312 </div>
          </div>
          <div className="flex gap-1.5 items-start self-center mt-8 max-w-full w-[191px]">
            <Image
              loading="lazy"
              src={img15}
              srcSet="..."
              className="flex-1 shrink-0 w-full aspect-square"
            />
            <Image
              loading="lazy"
              src={img16}
              srcSet="..."
              className="flex-1 shrink-0 w-full aspect-square"
            />
            <Image
              loading="lazy"
              src={img17}
              srcSet="..."
              className="flex-1 shrink-0 my-auto w-full aspect-square"
            />
            <Image
              loading="lazy"
              src={img18}
              srcSet="..."
              className="flex-1 shrink-0 w-full aspect-square"
            />
          </div>
        </div>
      </div>
    </div>

  );
}
