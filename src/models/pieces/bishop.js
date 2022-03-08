import Piece from '@/models/pieces/piece'

export default class Bishop extends Piece {
  availablePositions(checker) {
    return [
      ...this.moveDiagonally(checker, 1, 1, 1),
      ...this.moveDiagonally(checker, 1, -1, 1),
      ...this.moveDiagonally(checker, -1, 1, 1),
      ...this.moveDiagonally(checker, -1, -1, 1),
    ];
  }
}