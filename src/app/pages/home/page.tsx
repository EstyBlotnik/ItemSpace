"use client";
import React, { useEffect, useState } from 'react';
import { ICar } from '../../types/car';
import { IBook } from '../../types/book';
import { fetchBooks } from '@/app/servesies/bookActions';
import { fetchCars } from '@/app/servesies/carsActions';
import Books from '@/app/components/Books';
import Cars from '@/app/components/Cars';
import { IGame } from '@/app/types/game'
import { fetchgames } from '@/app/servesies/gamesActions';
import Games from '@/app/components/Games';

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [cars, setCars] = useState<ICar[]>([]);
  const [games, setGames] = useState<IGame[]>([]);
  const [activeTab, setActiveTab] = useState<'books' | 'cars' | 'games'>('books'); // תוסף כדי למנוע התערבבות בין הספרים לרכבים

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const booksData = await fetchBooks();
    const carsData = await fetchCars();
    const gamesData = await fetchgames();
    console.log("games:")
    console.log(gamesData);
    setBooks(booksData);
    setCars(carsData);
    setGames(gamesData);
  };
  return (
    <div className="flex flex-col items-center p-8 max-w-5xl mx-auto bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">Welcome to the Home Page</h1>

      {/* כפתורים למעבר בין הקטגוריות */}
      <div className="flex gap-6 mb-6">
        <button
          className={`px-6 py-2 text-lg font-semibold rounded-lg ${activeTab === 'books' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('books')}
        >
          Books
        </button>
        <button
          className={`px-6 py-2 text-lg font-semibold rounded-lg ${activeTab === 'cars' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('cars')}
        >
          Cars
        </button>
        <button
          className={`px-6 py-2 text-lg font-semibold rounded-lg ${activeTab === 'games' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('games')}
        >
          Games
        </button>
      </div>

      {/* הצגת ספרים */}
      {activeTab === 'books' && (
        <div className="w-full bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Books:</h2>
          <Books books={books} fetchData={fetchData} />
        </div>
      )}

      {/* הצגת רכבים */}
      {activeTab === 'cars' && (
        <div className="w-full bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Cars:</h2>
          <ul>
            <Cars cars={cars} fetchData={fetchData} />
          </ul>
        </div>
      )}

      {activeTab === 'games' && (
        <div className="w-full bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Games:</h2>
          <ul>
            <Games games={games} fetchData={fetchData} />
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;
