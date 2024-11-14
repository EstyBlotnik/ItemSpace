import connect from "@/app/lib/db/mongodb";
import Car from "@/app/lib/models/car";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const { licensePlate, chassisNumber, brand, carModel, mileage } = await request.json();
        const car1 = await Car.findOne({ licensePlate: licensePlate });
        const car2 = await Car.findOne({ chassisNumber: chassisNumber });
        if (car1 || car2) {
            return NextResponse.json({
                massege: "car already exist",
                status: 400
            })
        }
        const newCar = new Car({ licensePlate, chassisNumber, brand, carModel, mileage })
        await newCar.save();
        return NextResponse.json({
            message: "car added sucssesfully!",
            car: newCar,
            status: 201
        });
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            massege: "Error",
            status: 400
        })
    }
}

export async function GET() {
    try {
        await connect();
        const cars = await Car.find();
        console.log(cars);
        return NextResponse.json(
            {
                message: "all cars",
                cars: cars,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            massege: "Error",
            status: 400
        })
    }
};


