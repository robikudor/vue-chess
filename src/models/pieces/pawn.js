import Piece from '@/models/pieces/piece'
import Position from '@/models/position';

export default class Pawn extends Piece {
  // canMoveTo(_newPosition) {
  // super(newPosition);
  // moved2LastTurn = true if moved 2
  // }

  availablePositions(checker) {
    const column = this.position.column;
    const row = this.position.row;
    let positions = [];
  
    const move1 = new Position({ column: column + (1 * this.direction()), row: row })
    if (!checker(move1)) {
      positions.push(move1);
      if (this.inStartingPosition) {
        const move2 = new Position({ column: column + (2 * this.direction()), row: row })
        if (!checker(move2)) { positions.push(move2); }
      }
    }

    const canGoLeft = row - 1 >= 0;
    if (canGoLeft) {
      const takeLeft = new Position({ column: column + (1 * this.direction()), row: row - 1});
      const pieceOnLeft = checker(takeLeft);
      if (pieceOnLeft && pieceOnLeft.pieceColor !== this.pieceColor) {
        positions.push(takeLeft);
      }
    }

    const canGoRight = row + 1 < 8;
    if (canGoRight) {
      const takeRight = new Position({ column: column + (1 * this.direction()), row: row + 1});
      const pieceOnLeft = checker(takeRight);
      if (pieceOnLeft && pieceOnLeft.pieceColor !== this.pieceColor) {
        positions.push(takeRight);
      }
    }

    // check if can en passant

    return positions;
  }

  direction() {
    return this.isWhite() ? 1 : -1;
  }
}