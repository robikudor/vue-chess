import Piece from '@/models/pieces/piece'

export default class Queen extends Piece {

  availablePositions(checker) {
    return [
      ...this.moveDiagonally(checker, 1, 1, 1),
      ...this.moveDiagonally(checker, 1, -1, 1),
      ...this.moveDiagonally(checker, -1, 1, 1),
      ...this.moveDiagonally(checker, -1, -1, 1),
      ...this.moveForward(checker, 1, 0, 1),
      ...this.moveForward(checker, -1, 0, 1),
      ...this.moveForward(checker, 0, 1, 1),
      ...this.moveForward(checker, 0, -1, 1),
    ];
  }


}