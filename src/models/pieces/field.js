import { TARGET_PIECE, TARGET_POSITION } from '@/static/constants';

export default class Field {
  isPiece() {
    return false;
  }

  addStyle() {
    this.style = this.isPiece() ? TARGET_PIECE : TARGET_POSITION;
  }

  clearStyle() {
    this.style = '';
  }
}