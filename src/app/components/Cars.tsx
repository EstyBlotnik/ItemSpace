"use client";
import React, { useState } from 'react'
import { ICar } from '../types/car';
import Car from './Car';
import { addCar } from '../servesies/carsActions';

interface CarsProps {
    cars: ICar[];
    fetchData: () => void;
}

const Cars = ({ cars, fetchData }: CarsProps) => {
    const [isAdding, setIsAdding] = useState(false);
    const [licensePlate, setLicensePlate] = useState('');
    const [chassisNumber, setChassisNumber] = useState('');
    const [brand, setBrand] = useState('');
    const [carModel, setCarModel] = useState('');
    const [mileage, setMileage] = useState<number>(0);
    const handleAddCar = () => {
        setIsAdding(true);
    }
    const addACar = () => {
        setIsAdding(false);
        setLicensePlate('');
        setChassisNumber('');
        setBrand('');
        setCarModel('');
        setMileage(0);
        addCar(licensePlate, chassisNumber, brand, carModel, mileage);
        fetchData();
    }
    return (
        <div>
            {cars.map((item, index) => (
                <li key={index} className="border-b border-gray-300 py-4">
                    <Car car={item} fetchData={fetchData} />
                </li>
            ))}
            <button
                onClick={handleAddCar} // פונקציה שתטפל בלחיצה על הכפתור
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
            >
                add a new car
            </button>

            {isAdding && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg  w-1/2 max-w-md">
                        <h2 className="text-xl font-semibold">Edit Book</h2>
                        <label>
                            license plate:
                            <input
                                type="text"
                                value={licensePlate}
                                onChange={(e) => { setLicensePlate(e.target.value) }}
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </label>
                        <label>
                            chassis number:
                            <input
                                type="text"
                                value={chassisNumber}
                                onChange={(e) => { setChassisNumber(e.target.value) }}
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </label>
                        <label>
                            brand:
                            <input
                                type="text"
                                value={brand}
                                onChange={(e) => { setBrand(e.target.value) }}
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </label>
                        <label>
                            car model:
                            <input
                                type="text"
                                value={carModel}
                                onChange={(e) => { setCarModel(e.target.value) }}
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </label>
                        <label>
                            mileage:
                            <input
                                type="number"
                                value={mileage}
                                onChange={(e) => { setMileage(Number(e.target.value)) }}
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </label>
                        <div className="mt-2">
                            <button onClick={addACar} className="bg-green-500 text-white py-1 px-2 rounded-lg">Save</button>
                            <button onClick={() => setIsAdding(false)} className="bg-red-500 text-white py-1 px-2 rounded-lg ml-2">Cancel</button>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default Cars