import { Document } from 'mongoose';

export interface IGame extends Document {
    gamename: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    company: string;
}

