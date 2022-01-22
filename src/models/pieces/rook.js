import Piece from '@/models/pieces/piece'
import Position from '@/models/position';

export default class Rook extends Piece {
  availablePositions(checker) {
    return [
      ...this.moveForward(checker, 1, 0, 1), 
      ...this.moveForward(checker, -1, 0, 1), 
      ...this.moveForward(checker, 0, 1, 1), 
      ...this.moveForward(checker, 0, -1, 1), 
    ];
  }

  moveForward(checker, columnDirection, rowDirection, depth) {
    const newColumn = this.position.column + (columnDirection * depth);
    const newRow = this.position.row + (rowDirection * depth);
    const insideOfBoard = newColumn >= 0 && newColumn < 8 && newRow >= 0 && newRow < 8;

    if (insideOfBoard) {
      const checkPosition = new Position({ column: newColumn, row: newRow });
      const piece = checker(checkPosition);
      if (!piece) {
        return [checkPosition].concat(this.moveForward(checker, columnDirection, rowDirection, depth + 1));
      }
      if (piece && piece.pieceColor !== this.pieceColor) {
        return [checkPosition];
      }
    }
    return [];
  }
}