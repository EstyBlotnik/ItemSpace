"use client";
import React, { useState } from 'react'
import { IGame } from '../types/game';
import Game from './Game';
import { addGame } from '../servesies/gamesActions';
interface GamesProps {
    games: IGame[];
    fetchData: () => void;
}
const Games = ({ games, fetchData }: GamesProps) => {
    const [isAdding, setIsAdding] = useState(false);
    const [gamename, setGamename] = useState('');
    const [description, setDescription] = useState('');
    const [minPlayers, setMinPlayers] = useState<number>(0);
    const [maxPlayers, setMaxPlayers] = useState<number>(1000);
    const [company, setCompany] = useState('');
    const handleAddGame = () => {
        setIsAdding(true);
    }
    const addAGame = () => {
        setIsAdding(false);
        setGamename('');
        setDescription('');
        setCompany('');
        setMaxPlayers(1000);
        setMinPlayers(0);
        addGame(gamename, description, minPlayers, maxPlayers, company);
        fetchData();
    }
    return (
        <div>
            {games.map((item, index) => (
                <li key={index} className="border-b border-gray-300 py-4">
                    <Game game={item} fetchData={fetchData} />
                </li>
            ))}
            <button
                onClick={handleAddGame} // פונקציה שתטפל בלחיצה על הכפתור
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
            >
                add a new game
            </button>

            {isAdding && (
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
                            <button onClick={addAGame} className="bg-green-500 text-white py-1 px-2 rounded-lg">Save</button>
                            <button onClick={() => setIsAdding(false)} className="bg-red-500 text-white py-1 px-2 rounded-lg ml-2">Cancel</button>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default Games