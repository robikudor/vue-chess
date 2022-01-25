import Field from '@/models/pieces/field'

export default class Piece extends Field {
  constructor(color, position) {
    super();
    this.pieceColor = color;
    this.position = position;
    this.inStartingPosition = true;
    this.showAvailableMoves = false;
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

  // eslint-disable-next-line no-unused-vars
  availablePositions(_checker) { [] }
}