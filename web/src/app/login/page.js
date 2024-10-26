'use client'
import Image from "next/image"
import img1 from "../../../static/login_page.png"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';

export default function Login(){
    
    const router=useRouter();

    const navigation=(url)=>{
      router.push(url)
    };
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

   const handlePassword=(value)=>{
    setPassword(value)
  }
   const handleEmail=(value)=>{
    setEmail(value)
  }
  const handlelogin = async () => {
    try {

      const response = await axios.post("https://localhost:7159/api/Users/login", {
        Email: email,
        Password: password
      
      });
  
      console.log(response.data); // Log the response data
  
      // Check if the response includes a token
      if (response.data.token) {
        // Store the token in localStorage or another secure place
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', JSON.stringify({ userId: response.data.userId }));
        localStorage.setItem('userName', JSON.stringify({ userName: response.data.userName}));
        localStorage.setItem('userEmail', JSON.stringify({ userEmail: response.data.userEmail }));
        localStorage.setItem('userRole', response.data.userRole);

        if (response.data.userRole === 'Customer') {
          router.push('/customer/dashboard');
        } else if (response.data.userRole === 'Vendor') {
          router.push('/vendor/dashboard');
        } 
        else if (response.data.userRole === 'Admin') {
          router.push('/admin/vendor_account');
        } 
      
       
      
      } else {
        // Display error message if login fails or token is not provided
        setMessage('Error: Invalid email or password or no token received');
      }   
  
    } catch (error) {
      console.error(error); // Log any errors
      setMessage('Error: Login failed');
    }
  };
    return(
        <div className="flex flex-col justify-center text-gray-600 bg-white" style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <Image
      loading="lazy"
      src={img1}
      srcSet="..."
      className="object-cover absolute inset-0 w-full h-full"
      
    />
<div className="flex flex-col justify-center items-center px-14 py-14">
  <div className="flex relative justify-center items-center bg-white" style={{ width: '40%', maxWidth: '700px', padding: '4rem 2rem', borderRadius: '1rem' ,height:"620px"}}>
    <div className="flex flex-col items-center w-full">
    <div className="text-4xl whitespace-nowrap text-center">TEXTILE TECH</div>
<div className="mt-6 text-4xl whitespace-nowrap text-center text-gray-600" style={{ fontFamily: 'rubik bubbles' }}>WELCOME BACK</div>
<div className="mt-8 text-xl text-black text-center" style={{ fontWeight: 'bold' }}>User Email</div>
<input type="email" className="mt-4 h-9 w-full border border-black rounded-3xl text-center" placeholder="User Name" style={{ width: 380, padding: '0.5rem 1rem' }}  onChange={(e) => handleEmail(e.target.value)}/>
<div className="mt-6 text-xl text-black text-center" style={{ fontWeight: 'bold' }}>Password</div>
<input type="password" className="mt-4 h-9 w-full border border-black rounded-3xl text-center" placeholder="Password" style={{ width: 380, padding: '0.5rem 1rem' }} onChange={(e) => handlePassword(e.target.value)}/>
<button className="mt-8 px-8 py-2 text-xl text-white bg-sky-500 rounded-3xl hover:bg-blue-700" onClick={handlelogin}>Sign In</button>
{message && <p className="mt-4 text-red-500">{message}</p>}
<button onClick={() => navigation("/signup")} className="mt-4 px-6 py-2 text-xl text-white bg-slate-400 rounded-lg hover:bg-slate-700" style={{ position: "relative", top: 20,left:3, textAlign: 'center' }}>Register</button>

    </div>
  </div>
</div>

  </div>
</div>

      
    )
}
