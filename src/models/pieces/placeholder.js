import Field from '@/models/pieces/piece';

export default class Placeholder extends Field {
  constructor(currentPiece, position) {
    super();
    this.position = position
    this.style = '';
  }

  get pieceImg() {
    return `placeholder.svg`
  }

  set style(value) {
    this.style = value;
  }

  static get SELECTED_PIECE() { return 'selectedPiece' }
  static get TARGET_PIECE() { return 'targetPiece' }
  static get TARGET_POSITION() { return 'targetPosition' }
  static get HISTORY_LOCATION() { return 'historyLocation' }
}