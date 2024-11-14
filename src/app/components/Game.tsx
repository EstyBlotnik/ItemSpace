"use client";
import React, { useState } from 'react'
import { IGame } from '../types/game'
import { deleteGame, editGame } from '../servesies/gamesActions';

interface GameProps {
    game: IGame;
    fetchData: () => void;
}
const Game = ({ game, fetchData }: GameProps) => {    
    const [localGame, setLocalGame] = useState<IGame>(game as IGame);
    const [isEdititng, setIsEdititng] = useState(false);
    const [gamename, setGamename] = useState(localGame.gamename);
    const [description, setDescription] = useState(localGame.description);
    const [minPlayers, setMinPlayers] = useState<number>(localGame.minPlayers);
    const [maxPlayers, setMaxPlayers] = useState<number>(localGame.maxPlayers);
    const [company, setCompany] = useState(localGame.company);
    console.log("first")
    const handleEdit = () => {
        console.log("Edit game:", gamename);
        setIsEdititng(true);
    };
    const saveEdit = async () => {
        setIsEdititng(false);
        const answer = await editGame({
            gamename, description, minPlayers, maxPlayers, company, _id: game._id ?? "0"
        });
        console.log(answer);
        setLocalGame(answer.game);
        fetchData();
    }
    const delete_game = (id: string) => {
        deleteGame(id);
        fetchData();
    }
    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white">
            <h3 className="text-lg font-bold text-blue-700">{localGame.gamename}</h3>
            <p className="text-gray-500 font-medium">players: {localGame.minPlayers} - {localGame.maxPlayers}</p>
            <div className="text-sm text-gray-600 mt-2">
                <p><strong>Description:</strong> {localGame.description}</p>
                <p><strong>company:</strong> {localGame.company} km</p>
            </div>
            <div className="mt-4 flex gap-3">
                <button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    עריכה
                </button>
                {game && game._id ? (
                    <button
                        onClick={() => delete_game(String(game._id))}
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
                            game name:
                            <input
                                type="text"
                                value={gamename}
                                onChange={(e) => { setGamename(e.target.value) }}
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </label>
                        <label>
                            description:
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </label>
                        <label>
                            min players:
                            <input
                                type="number"
                                value={minPlayers}
                                onChange={(e) => { setMinPlayers(Number(e.target.value)) }}
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </label>
                        <label>
                            max players:
                            <input
                                type="number"
                                value={maxPlayers}
                                onChange={(e) => { setMaxPlayers(Number(e.target.value)) }}
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </label>
                        <label>
                            company:
                            <input
                                type="text"
                                value={company}
                                onChange={(e) => { setCompany(e.target.value) }}
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


export default Game