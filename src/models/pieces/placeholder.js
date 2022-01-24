import Field from '@/models/pieces/piece';

export default class Placeholder extends Field {
  constructor() {
    super();
    this.style = '';
  }

  isPiece() {
    return false;
  }
}