"use client";
import axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    const sihnIn = async () => {
        if (email && password) {
            try {
                const response = await axios.post('/api/user', {
                    email, password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setEmail('');
                setPassword('');
                console.log(response.data)
                if (response.data.status==200) {
                    router.push('/pages/home')
                }
                else{
                    alert("The information entered is incorrect")
                }
            } catch (error) {
                console.error("Error adding user:", error);
            }

        } else {
            console.log("Fill all fields");
        }
    };

    return (
        <div className='flex justify-center items-center p-[20px]'>
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>
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
                <button onClick={sihnIn} className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign in</button>
            </div>
        </div>
    )
}

export default Page