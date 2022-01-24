import Field from '@/models/pieces/field'
// import _ from 'lodash';

export default class Piece extends Field {
  constructor(color, position) {
    super();
    this.pieceColor = color; 
    this.position = position;
    this.pieceIsInStartingPosition = true;
    this.showAvailableMoves = false;
  }

  get pieceImg() {
    return `${this.pieceColor}${this.constructor.name}.svg`
  }

  // eslint-disable-next-line no-unused-vars
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
    this.pieceIsInStartingPosition = false
  }

  isBlack() {
    return this.pieceColor === 'black'
  }

  isWhite() {
    return this.pieceColor === 'white'
  }

  isPiece() {
    return true
  }

  // eslint-disable-next-line no-unused-vars
  availablePositions(_checker) { [] }
}