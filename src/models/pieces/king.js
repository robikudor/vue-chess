import Piece from '@/models/pieces/piece'
import Position from '@/models/position';

export default class King extends Piece {
  // eslint-disable-next-line no-unused-vars
  availablePositions(checker, enemyPieces) {
    const allPosition = [
      ...this.moveDiagonally(checker, 1, 1),
      ...this.moveDiagonally(checker, 1, -1),
      ...this.moveDiagonally(checker, -1, 1),
      ...this.moveDiagonally(checker, -1, -1),
      ...this.moveForward(checker, 1, 0),
      ...this.moveForward(checker, -1, 0),
      ...this.moveForward(checker, 0, 1),
      ...this.moveForward(checker, 0, -1),
    ]

    // const notAllowedPositions = enemyPieces.map((el) => el.availableMoves).flat();
    // allPosition.forEach((el, index) => {
    //   if (notAllowedPositions.find((pos) => { pos.isEqual(el) })) {
    //     allPosition(index, 0)
    //   }
    // })
    return allPosition;
  }

  // Add logic to check if its in check
  moveDiagonally(checker, columnDirection, rowDirection) {
    const newColumn = this.position.column + (columnDirection);
    const newRow = this.position.row + (rowDirection);
    const insideOfBoard = newColumn >= 0 && newColumn < 8 && newRow >= 0 && newRow < 8;

    if (insideOfBoard) {
      const checkPosition = new Position({ column: newColumn, row: newRow });
      const piece = checker(checkPosition);
      if (!piece) {
        return [checkPosition]
      }
      if (piece && piece.pieceColor !== this.pieceColor) {
        return [checkPosition];
      }
    }
    return [];
  }

  moveForward(checker, columnDirection, rowDirection) {
    const newColumn = this.position.column + (columnDirection);
    const newRow = this.position.row + (rowDirection);
    const insideOfBoard = newColumn >= 0 && newColumn < 8 && newRow >= 0 && newRow < 8;

    if (insideOfBoard) {
      const checkPosition = new Position({ column: newColumn, row: newRow });
      const piece = checker(checkPosition);
      if (!piece) {
        return [checkPosition];
      }
      if (piece && piece.pieceColor !== this.pieceColor) {
        return [checkPosition];
      }
    }
    return [];
  }

  // Add can castle queen / kingside and add option to availablePositions

  isChecked(checker, enemyPieces) {
    let isInCheck = false
    let self = this;
    enemyPieces.forEach((piece) => {
      piece.availablePositions(checker).forEach((position) => {
        if (position.isEqual(self.position)) { isInCheck = true }
      })
    });
    return isInCheck;
  }
}