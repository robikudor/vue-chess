export default class Position {
  constructor(props) {
    let { row, column } = props
    this.row = parseInt(row);
    this.column = parseInt(column);
  }

  isEqual(otherPositon) {
    return this.row === otherPositon.row &&
      this.column === otherPositon.column
  }
}