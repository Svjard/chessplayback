import BoardState from './boardstate';
import { initializeEvents } from './chessplayback';

const boardState = new BoardState();
initializeEvents(boardState);
