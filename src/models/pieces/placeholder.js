import Field from '@/models/pieces/piece';

export default class Placeholder extends Field {
  constructor(currentPiece, position) {
    super();
    this.position = position
  }

  get pieceImg() {
    return `placeholder.svg`
  }
}