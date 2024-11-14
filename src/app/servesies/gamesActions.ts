import axios from 'axios';
import { IGame } from '@/app/types/game';

const apiUrl = 'http://localhost:3000/api/games';

export const fetchgames = async (): Promise<IGame[]> => {
    try {
        const response = await axios.get<{ games: IGame[] }>(apiUrl); // מוודא את מבנה התגובה
        console.log("games:", response.data.games); // הדפסת הנתונים שהתקבלו
        return response.data.games; // החזרת מערך הספרים
    } catch (error) {
        console.error("Failed to fetch games:", error);
        return []; // החזרת מערך ריק במקרה של שגיאה
    }
};

export const deleteGame = async (id: string) => {
    try {
        const response = await axios.delete(`${apiUrl}/${id}`); // ציין את מבנה התגובה
        return response.data;
    } catch (error) {
        console.error("Failed to edit book:", error);
        throw error;
    }
};

export const addGame = async (gamename: string, description: string, minPlayers: number, maxPlayers: number, company: string) => {
    try {
        const response = await axios.post(apiUrl, {
            gamename: gamename,
            description: description,
            minPlayers: minPlayers,
            maxPlayers: maxPlayers,
            company: company
        });
        // אם רוצים להחזיר את התגובה או לעבד אותה כאן:
        return response.data;
    } catch (error) {
        console.error('Error adding game:', error);
        throw error;  // אפשר גם להחזיר שגיאה או לטפל בה אחרת
    }
};

type EditableGameFields = Pick<IGame, "gamename" | "description" | "minPlayers" | "maxPlayers" | "company" | "_id">;

export const editGame = async (game: EditableGameFields) => {
    try {
        const response = await axios.put(`${apiUrl}/${game._id}`, {
            gamename: game.gamename,
            description: game.description,
            minPlayers: game.minPlayers,
            maxPlayers: game.maxPlayers,
            company: game.company
        });
        console.log("Game edited:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to edit game:", error);
        throw error;
    }
};