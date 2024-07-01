export default class BoardState {
  constructor() {
    this.moves = [
      { value: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', isDirty: false }
    ];
    this.currentMoveIndex = -1;
    this.lastTimestamp = null;
    this.state = 'stop';
  }

  appendMove(move) { this.moves.push(move); }
  appendMovesBulk(moves) { this.moves = this.moves.concat(moves); }
  updateMove(index, move) { this.moves[index].value = move; }
  deleteMove(index) { this.moves.splice(index, 1); }

  get currentMove() { return this.moves[this.currentMoveIndex]; }

  stepBackward() { if (this.currentMoveIndex - 1 >= 0) this.currentMoveIndex--; }
  stepForward() { if (this.currentMoveIndex + 1 <= this.moves.length - 1) this.currentMoveIndex++; }

  isPlaying() { return this.state === 'play'; }
  play() { this.state = 'play'; }
  stop() { this.state = 'stop'; }
};