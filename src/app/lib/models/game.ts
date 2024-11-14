import { IGame } from "@/app/types/game";
import mongoose, { Schema, Model } from 'mongoose';

const gameSchema: Schema<IGame> = new Schema({
    gamename: { type: String, required: true },
    description: { type: String, required: true },
    minPlayers: { type: Number, required: true },
    maxPlayers: { type: Number, required: true },
    company: { type: String, required: true },
});

const Game: Model<IGame> = mongoose.models.Game || mongoose.model<IGame>('Game', gameSchema);

export default Game;
