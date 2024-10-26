'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import img1 from '../../../static/login_page.png';
export default function MyComponent(props) {
  const router = useRouter();
  const [userType, setUserType] = useState('customer'); // State to track whether the user is a customer or vendor
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const [pdfFile, setPdfFile] = useState(null);

  const handleUsername = (value) => {
    setUsername(value)
  }
  const handlePassword = (value) => {
    setPassword(value)
  }
  const handleEmail = (value) => {
    setEmail(value)
  }
  const handlePhoneNumber = (value) => {
    setPhoneNumber(value)
  }
  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const Customer_handleSignUp = async () => {
    const url = 'https://localhost:7159/api/Users/register'; // URL for registration
    const payload = {
      Name: name,
      Password: password,
      Email: email,
      PhoneNumber: phoneNumber
    };

    try {
      const response = await axios.post(url, payload);
      console.log(response.data); // Log the response from the server
      setMessage('Signup successful');
      router.push("/"); // Redirect to the homepage or dashboard upon successful signup
    } catch (error) {
      console.error(error); // Log the error
      setMessage('Error signing up'); // Set the error message to display in your UI
    }
  };
  const Vendor_handleSignUp = async (pdfFile) => {
    const url = 'https://localhost:7159/api/vendor/vendorregister'; // Corrected URL to match backend endpoint
    const formData = new FormData();

    // Append fields to formData
    formData.append('Name', name);
    formData.append('Password', password);
    formData.append('Email', email);
    formData.append('PhoneNumber', phoneNumber);
    formData.append('PdfDocument', pdfFile); // Assuming pdfFile is the PDF document you want to upload

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // This is typically unnecessary, but included for clarity
        }
      });
      console.log(response.data); // Log the response from the server
      setMessage('Signup successful');
      router.push("/"); // Redirect to the homepage or dashboard upon successful signup
    } catch (error) {
      console.error(error); // Log the error
      setMessage('Error signing up'); // Set the error message to display in your UI
    }
  };

  return (
    <div className="flex flex-col justify-center text-gray-600  h-screen w-full overflow-hidden" >
    <div className="relative w-full h-full">
      <Image
        loading="lazy"
        src={img1}
        alt="Login Page"
        className="object-cover absolute inset-0 w-full h-full"
      />
      <div className="flex flex-col justify-center items-center px-14 py-10 text-center" >
        <div className="flex justify-center items-center bg-white rounded-l shadow-md w-35%" >
          <div className="flex flex-col items-center bg-white w-full relative top-20" style={{position:'relative',"right":-10,"top":-5, padding: '4rem 2rem', borderRadius: '1rem' ,height:"670px"}}>
            <div className="text-4xl">TEXTILE TECH</div>
            <div className="mt-6 text-4xl whitespace-nowrap text-center text-gray-600 font-rubik-bubbles">WELCOME BACK</div>
  
            {/* User Type Selection */}
            <div className="mt-6 relative top-[-10]">
              <button className={`px-4 py-2 rounded-l ${userType === 'customer' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setUserType('customer')}>For Customer</button>
              <button className={`px-4 py-2 rounded-r ${userType === 'vendor' ? 'bg-green-500 text-white' : 'bg-gray-200'}`} onClick={() => setUserType('vendor')}>For Vendor</button>
            </div>
  
            {/* Conditional Rendering based on User Type */}
            {userType === 'customer' ? (
              // Customer Fields
              <>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{position:'relative',"top":25}}>
                    <div className="mt-8 text-xl font-bold relative top-[-10]"  >Customer Name</div>
                    <input type="text" className="mt-4 h-9 w-full border border-black rounded-3xl text-center" placeholder="User Name" required  style={{position:'relative',"right":30,"top":15}} onChange={(e) => handleUsername(e.target.value)}/>
                    <div className="mt-6 text-xl font-bold relative top-[-25]" style={{position:'relative',"top":5}}>Password</div>
                    <input type="password" className="mt-4 h-9 w-full border border-black rounded-3xl text-center" placeholder="Password" required style={{position:'relative',"right":30,"top":5}} onChange={(e) => handlePassword(e.target.value)}/>
                    <div className="mt-6 text-xl font-bold relative top-[-30]">Email</div>
                    <input type="email" className="mt-4 h-9 w-full border border-black rounded-3xl text-center" placeholder="Name@email.com" required style={{position:'relative',"right":30,"top":5}}  onChange={(e) => handleEmail(e.target.value)}/>
                    <div className="mt-6 text-xl font-bold relative top-[-30]">Phone Number</div>
                    <input type="text" className="mt-4 h-9 w-full border border-black rounded-3xl text-center" placeholder="033xxxxxxx" required style={{position:'relative',"right":30,"top":5}} onChange={(e) => handlePhoneNumber(e.target.value)}/>
                 
                   
                  </div>
                  <button className="mt-8 px-9 py-3 text-xl text-white bg-sky-500 rounded-3xl hover:bg-blue-700" style={{position:'relative',"top":45}} onClick={() =>Customer_handleSignUp()}>Sign Up</button>
              </>
            ) :
              userType === 'vendor' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mt-8 text-xl font-bold relative top-[-10] " >VendorName</div>
                    <input type="text" className="mt-4 h-9 w-full border border-black rounded-3xl text-center" placeholder="User Name" required  style={{position:'relative',"right":30,"top":15}} onChange={(e) => handleUsername(e.target.value)}/>
                    <div className="mt-6 text-xl font-bold relative top-[-25]" style={{position:'relative',"top":5}}>Password</div>
                    <input type="password" className="mt-4 h-9 w-full border border-black rounded-3xl text-center" placeholder="Password" required style={{position:'relative',"right":30,"top":5}} onChange={(e) => handlePassword(e.target.value)}/>
                    <div className="mt-6 text-xl font-bold relative top-[-30]">Email</div>
                    <input type="email" className="mt-4 h-9 w-full border border-black rounded-3xl text-center" placeholder="Name@email.com" required style={{position:'relative',"right":30,"top":5}}  onChange={(e) => handleEmail(e.target.value)}/>
                    <div className="mt-6 text-xl font-bold relative top-[-30]">Phone Number</div>
                    <input type="text" className="mt-4 h-9 w-full border border-black rounded-3xl text-center" placeholder="033xxxxxxx" required style={{position:'relative',"right":30,"top":5}} onChange={(e) => handlePhoneNumber(e.target.value)}/>
                    <div className="mt-6 text-xl font-bold relative top-[-30]" style={{position:'relative',"top":5}}>PDF Document</div>
                    <label className="mt-4 block relative">
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        required
                      />
                      <span className="block w-full h-full bg-transparent border border-black rounded-3xl py-2 px-4 cursor-pointer" style={{position:'relative',"right":30,"top":5}}>
                        Choose File
                      </span>
                    </label>
                   
                  </div>
                  <button className="mt-8 px-9 py-3 text-xl text-white bg-sky-500 rounded-3xl hover:bg-blue-700" onClick={() => Vendor_handleSignUp(pdfFile)}>Sign Up</button>
                </>
              )}
  
            {message && <p className="mt-4 text-red-500">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  </div>
  
     
  );
}