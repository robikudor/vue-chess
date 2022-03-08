import Piece from '@/models/pieces/piece'

export default class Rook extends Piece {
  availablePositions(checker) {
    return [
      ...this.moveForward(checker, 1, 0, 1),
      ...this.moveForward(checker, -1, 0, 1),
      ...this.moveForward(checker, 0, 1, 1),
      ...this.moveForward(checker, 0, -1, 1),
    ];
  }
}