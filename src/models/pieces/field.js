

export default class Field {
  isPiece() {
    return false;
  }

  addStyle() {
    this.style = this.isPiece() ? Field.TARGET_PIECE : Field.TARGET_POSITION;
  }

  clearStyle() {
    this.style = '';
  }

  static get SELECTED_PIECE() { return 'selectedPiece' }
  static get TARGET_PIECE() { return 'targetPiece' }
  static get TARGET_POSITION() { return 'targetPosition' }
  static get HISTORY_LOCATION() { return 'historyLocation' }
}