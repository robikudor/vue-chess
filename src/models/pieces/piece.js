import Field from '@/models/pieces/field'
import Position from '@/models/position';

export default class Piece extends Field {
  constructor(color, position) {
    super();
    this.pieceColor = color;
    this.position = position;
    this.inStartingPosition = true;
    this.showAvailableMoves = false;
    this.availableMoves = [];
    this.pieceName = this.constructor.name;
  }

  get pieceImg() {
    return `${this.pieceColor}${this.constructor.name}.svg`
  }

  canMoveTo(newPosition, checker) {
    // check if piece is pinned to the king and newPosition is in availablePositions
    if (this.availablePositions(checker)
            .find(el => el.isEqual(newPosition))) {
      return true;
    }
    return false;
  }

  hideAvailableMoves() {
    this.showAvailableMoves = false
  }

  updatePieceMoved() {
    this.inStartingPosition = false
  }

  isBlack() {
    return this.pieceColor === 'black'
  }

  isWhite() {
    return this.pieceColor === 'white'
  }

  isPiece() {
    return true;
  }

  isPawn() {
    return false;
  }

  moveDiagonally(checker, columnDirection, rowDirection, depth = 1) {
    const newColumn = this.position.column + (columnDirection * depth);
    const newRow = this.position.row + (rowDirection * depth);
    const insideOfBoard = newColumn >= 0 && newColumn < 8 && newRow >= 0 && newRow < 8;

    if (insideOfBoard) {
      const checkPosition = new Position({ column: newColumn, row: newRow });
      const piece = checker(checkPosition);
      if (!piece) {
        return [checkPosition].concat(this.moveDiagonally(checker, columnDirection, rowDirection, depth + 1));
      }
      if (piece && piece.pieceColor !== this.pieceColor) {
        return [checkPosition];
      }
    }
    return [];
  }

  moveForward(checker, columnDirection, rowDirection, depth = 1) {
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

  // eslint-disable-next-line no-unused-vars
  availablePositions(_checker, _enemyPieces) { [] }
}