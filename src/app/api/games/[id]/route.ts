import connect from "@/app/lib/db/mongodb";
import Game from "@/app/lib/models/game";
import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ message: "ID not provided", status: 400 });
        }
        const { gamename, description, minPlayers, maxPlayers, company } = await request.json();
        const updatedGame = await Game.findByIdAndUpdate(id,
            {
                gamename, description, minPlayers, maxPlayers, company
            },
            { new: true }
        );
        return NextResponse.json({
            message: "game changed succsesfully",
            game: updatedGame,
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

        await Game.findByIdAndDelete(id);
        return NextResponse.json({
            message: "game deleted succsesfully",
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


