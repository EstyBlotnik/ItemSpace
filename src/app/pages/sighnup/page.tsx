"use client";
import axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter()
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const addUser = async () => {
        if (userName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                try {
                    const response = await axios.post('/api/users', {
                        userName, email, password
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    setEmail('');
                    setUserName('');
                    setPassword('');
                    setConfirmPassword('');
                    console.log(response.data.message);
                    if (response.data.status == 200||response.data.status == 201) {
                        router.push('/pages/home')
                    }else{
                        alert(response.data.massege);
                    }
                } catch (error) {
                    console.error("Error adding user:", error);
                }
            } else {
                console.log("The authentication is not correct");
            }
        } else {
            console.log("Fill all fields");
        }
    };

    return (
        <div className='flex justify-center items-center p-[20px]'>

            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Username
                        <input type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" >Password
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Confirm Password
                        <input type="password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </label>
                </div>

                <button onClick={addUser} className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Register</button>
            </div>
        </div>
    )
}

export default Page