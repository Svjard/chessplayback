import Chance from 'chance';
import BoardState from '../src/boardstate';

const chance = new Chance();

describe('Board State Tests', () => {
  it('should correctly initialize the state', () => {
    const boardState = new BoardState();
    expect(boardState.moves).toStrictEqual([{ value: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', isDirty: false }]);
    expect(boardState.currentMoveIndex).toEqual(-1);
    expect(boardState.lastTimestamp).toEqual(null);
    expect(boardState.state).toEqual('stop');
  });

  it('should correctly add one new move', () => {
    const boardState = new BoardState();

    const newMove = { [chance.guid()]: chance.guid() };
    boardState.appendMove(newMove);
    expect(boardState.moves).toStrictEqual([
      { value: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', isDirty: false },
      newMove
    ]);
  });

  it('should correctly add bulk new moves', () => {
    const boardState = new BoardState();

    const newMoves = chance.n(() => ({ [chance.guid()]: chance.guid() }), chance.integer({ min: 1, max: 5 }));
    boardState.appendMovesBulk(newMoves);
    expect(boardState.moves).toStrictEqual([
      { value: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', isDirty: false },
      ...newMoves
    ]);
  });

  it('should correctly delete a move', () => {
    const boardState = new BoardState();

    const newMoves = chance.n(() => ({ [chance.guid()]: chance.guid() }), chance.integer({ min: 1, max: 5 }));
    boardState.appendMovesBulk(newMoves);
    boardState.deleteMove(0);
    expect(boardState.moves).toStrictEqual([
      ...newMoves
    ]);

    boardState.deleteMove(newMoves.length - 1);
    newMoves.splice(newMoves.length - 1, 1);
    expect(boardState.moves).toStrictEqual([
      ...newMoves
    ]);
  });

  it('should return the current move', () => {
    const boardState = new BoardState();

    const newMoves = chance.n(() => ({ [chance.guid()]: chance.guid() }), chance.integer({ min: 3, max: 5 }));
    boardState.moves = newMoves;
    boardState.stepForward();
    boardState.stepForward();

    expect(boardState.currentMove).toEqual(newMoves[1]);
  });

  it('should not step forward if no more moves are available', () => {
    const boardState = new BoardState();
    boardState.moves = [chance.guid(), chance.guid()];
    boardState.currentMoveIndex = 1;

    boardState.stepForward();
    expect(boardState.currentMoveIndex).toEqual(1);
  });

  it('should step forward if more moves available', () => {
    const boardState = new BoardState();
    boardState.moves = [chance.guid(), chance.guid()];
    boardState.currentMoveIndex = 0;

    boardState.stepForward();
    expect(boardState.currentMoveIndex).toEqual(1);
  });

  it('should not step backward if at the first move', () => {
    const boardState = new BoardState();
    boardState.moves = [chance.guid(), chance.guid()];
    boardState.currentMoveIndex = 0;

    boardState.stepBackward();

    expect(boardState.currentMoveIndex).toEqual(0);
  });

  it('should step backward if not yet at the first move', () => {
    const boardState = new BoardState();
    boardState.moves = [chance.guid(), chance.guid()];
    boardState.currentMoveIndex = 1;

    boardState.stepBackward();

    expect(boardState.currentMoveIndex).toEqual(0);
  });

  it('should change the state to play', () => {
    const boardState = new BoardState();

    boardState.play();

    expect(boardState.state).toEqual('play');
  });

  it('should step backward', () => {
    const boardState = new BoardState();

    boardState.stop();

    expect(boardState.state).toEqual('stop');
  });
});