import Piece from '@/models/pieces/piece';
import Position from '@/models/position';

export default class Knight extends Piece {
  availablePositions(checker) {
    let positions = [
      this.checkLocation(checker, 1, 2),
      this.checkLocation(checker, -1, 2),
      this.checkLocation(checker, 1, -2),
      this.checkLocation(checker, -1, -2),

      this.checkLocation(checker, 2, 1),
      this.checkLocation(checker, -2, 1),
      this.checkLocation(checker, 2, -1),
      this.checkLocation(checker, -2, -1),
    ].filter((el) => el !== null)

    return positions;
  }

  checkLocation(checker, columnOffset, rowOffset) {
    const newColumn = this.position.column + columnOffset;
    const newRow = this.position.row + rowOffset;  
    const insideOfBoard = newColumn >= 0 && newColumn < 8 && newRow >= 0 && newRow < 8;
  
    if (insideOfBoard) {
      const checkPosition = new Position({ column: newColumn, row: newRow });
      const piece = checker(checkPosition);
      if (!piece) {
        return checkPosition;
      }
      if (piece && piece.pieceColor !== this.pieceColor) {
        return checkPosition;
      }
    }
    return null;
  }
}