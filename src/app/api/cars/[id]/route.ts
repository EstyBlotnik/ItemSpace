import connect from "@/app/lib/db/mongodb";
import Car from "@/app/lib/models/car";
import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ message: "ID not provided", status: 400 });
        }
        const { licensePlate, chassisNumber, brand, carModel, mileage } = await request.json();
        const updatedCar = await Car.findByIdAndUpdate(id,
            {
                licensePlate,
                chassisNumber,
                brand,
                carModel,
                mileage
            },
            { new: true }
        );
        return NextResponse.json({
            message: "car changed succsesfully",
            car: updatedCar,
            status: 200
        });
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            massege: "Error",
            status: 400
        })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
    try {
        await connect();
        const { id } = await params;
        console.log(id)

        await Car.findByIdAndDelete(id);
        return NextResponse.json({
            message: "car deleted succsesfully",
            status: 200
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            massege: "Error",
            status: 400
        })
    }
};


