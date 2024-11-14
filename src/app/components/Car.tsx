"use client";
import React, { useState } from 'react'
import { ICar } from '../types/car'
import { deleteCar, editCar } from '../servesies/carsActions';
interface CarProps {
    car: ICar;
    fetchData: () => void;
}
const Car = ({ car, fetchData }: CarProps) => {
    const [localCar, setLocalCar] = useState<ICar>(car as ICar);
    const [isEdititng, setIsEdititng] = useState(false);
    const [licensePlate, setLicensePlate] = useState(localCar.licensePlate);
    const [chassisNumber, setChassisNumber] = useState(localCar.chassisNumber);
    const [brand, setBrand] = useState(localCar.brand);
    const [carModel, setCarModel] = useState(localCar.carModel);
    const [mileage, setMileage] = useState<number>(localCar.mileage);

    const handleEdit = () => {
        console.log("Edit car:", car.licensePlate);
        setIsEdititng(true);
    };
    const saveEdit = async () => {
        setIsEdititng(false);
        const answer = await editCar({
            licensePlate, chassisNumber, brand, carModel, mileage, _id: car._id ?? "0"
        });
        console.log(answer);
        setLocalCar(answer.car);
        fetchData();
    }
    const delete_car = (id: string) => {
        deleteCar(id);
        fetchData();
    }
    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white">
            <h3 className="text-lg font-bold text-blue-700">{localCar.licensePlate}</h3>
            <p className="text-gray-500 font-medium">{localCar.brand} - {localCar.carModel}</p>
            <div className="text-sm text-gray-600 mt-2">
                <p><strong>Chassis Number:</strong> {localCar.chassisNumber}</p>
                <p><strong>Mileage:</strong> {(localCar.mileage || 0).toLocaleString()} km</p>
            </div>
            <div className="mt-4 flex gap-3">
                <button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    עריכה
                </button>
                {car && car._id ? (
                    <button
                        onClick={() => delete_car(String(car._id))}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                ) : null}
            </div>
            {isEdititng && (
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
                            <button onClick={saveEdit} className="bg-green-500 text-white py-1 px-2 rounded-lg">Save</button>
                            <button onClick={() => setIsEdititng(false)} className="bg-red-500 text-white py-1 px-2 rounded-lg ml-2">Cancel</button>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    );
};


export default Car