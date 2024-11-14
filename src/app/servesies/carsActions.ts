import axios from 'axios';
import { ICar } from '@/app/types/car';

const apiUrl = 'http://localhost:3000/api/cars';

export const fetchCars = async (): Promise<ICar[]> => {
    const response = await axios.get<{ cars: ICar[] }>(apiUrl); // ציין את מבנה התגובה
    console.log(response.data.cars); // הצגת המשתמשים שהתקבלו
    return response.data.cars; // החזרת המערך של המשתמשים
};

export const addCar = async (licensePlate: string, chassisNumber: string, brand: string, carModel: string, mileage: number) => {
    try {
        const response = await axios.post(apiUrl, {
            licensePlate: licensePlate,
            chassisNumber: chassisNumber,
            brand: brand,
            carModel: carModel,
            mileage: mileage
        });
        // אם רוצים להחזיר את התגובה או לעבד אותה כאן:
        return response.data;
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;  // אפשר גם להחזיר שגיאה או לטפל בה אחרת
    }
};

type EditableCarFields = Pick<ICar, "licensePlate" | "chassisNumber" | "brand" | "carModel" | "mileage" | "_id">;

export const editCar = async (car: EditableCarFields) => {
    try {
        const response = await axios.put(`${apiUrl}/${car._id}`, {
            licensePlate: car.licensePlate,
            chassisNumber: car.chassisNumber,
            brand: car.brand,
            carModel: car.carModel,
            mileage: car.mileage
        });
        console.log("Car edited:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to edit car:", error);
        throw error;
    }
};

export const deleteCar = async (id: string) => {
    try {
        const response = await axios.delete(`${apiUrl}/${id}`); // ציין את מבנה התגובה
        return response.data;
    } catch (error) {
        console.error("Failed to edit book:", error);
        throw error;
    }
}