export default class Piece {
  constructor(color, position) {
    this.pieceColor = color; 
    this.position = position;
  }

  get pieceImg() {
    return `${this.pieceColor}${this.constructor.name}.svg`
  }

}