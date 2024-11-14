import connect from "@/app/lib/db/mongodb";
import Game from "@/app/lib/models/game";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        console.log("games")
        await connect();
        const { gamename, description, minPlayers, maxPlayers, company } = await request.json();
        const newGame = new Game({ gamename, description, minPlayers, maxPlayers, company })
        await newGame.save();
        return NextResponse.json({
            message: "car added sucssesfully!",
            game: newGame,
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
        const games = await Game.find();
        return NextResponse.json(
            {
                message: "all games",
                games: games,
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


