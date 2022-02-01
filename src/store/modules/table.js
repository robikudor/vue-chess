import Placeholder from "@/models/pieces/placeholder";
import { buildPiece } from "@/utils/pieceFactory";

const emptyBoard = () => ({
  board: Array.from({length: 8}, () => Array.from({length: 8}, () => new Placeholder()))
});

const startingMap = () => {
  return "wr00wn10wb20wq30wk40wb50wn60wr70" +
         "wp01wp11wp21wp31wp41wp51wp61wp71" +
         "bp06bp16bp26bp36bp46bp56bp66bp76" +
         "br07bn17bb27bq37bk47bb57bn67br77";
}

export default {
  namespaced: true,
  state: emptyBoard(),
  mutations: {
    setStartingPosition(state, pattern = null) {
      state.board = emptyBoard().board;
      pattern ||= startingMap();
      pattern.match(/.{4}/g).forEach((markup) => {
        const piece = buildPiece(markup);
        state.board[piece.position.row][piece.position.column] = piece;
      })
    },
    movePiece(state, { oldPosition, newPosition }) {
      const piece = state.board[oldPosition.row][oldPosition.column];
      state.board[oldPosition.row][oldPosition.column] = new Placeholder();
      state.board[newPosition.row][newPosition.column] = piece;
      piece.position = newPosition;
      piece.inStartingPosition = false;
    },
    swapPiece(state, { position, pieceMarkup }) {
      state.board[position.row][position.column] = buildPiece(pieceMarkup);
    },
    addPlaceholder(state, piece) {
      const locations = piece.availableMoves;
      locations.forEach(location => {
        const currentPiece = state.board[location.row][location.column]
        currentPiece.addStyle()
      });
      piece.showAvailableMoves = true;
    },
    clearPlaceholders(state) {
      state.board.forEach(row => {
        row.forEach(field => {
          field.clearStyle();
          field.hideAvailableMoves()
        })
      })
    },
    setPieceStyle(state, {position, style}) {
      state.board[position.row][position.column].style = style
    },
    // updateAvailablePositions(state, {getter, enemyPieces}) {
    updateAvailablePositions(state, getter) {
      state.board.forEach((row) => {
        row.forEach((piece) => {
          if (piece.isPiece()) {
            piece.availableMoves = piece.availablePositions(getter);
          }
        })
      })
    }
  },
  getters: {
    getPieceAt: (state) => (position) => {
      const field = state.board[position.row][position.column];
      return field.isPiece() ? field : null
    },
    getKing: (state) => (color) => {
      let king = null;
      state.board.forEach((row) => {
        row.forEach((field) => {
          if (!field.constructor.name === 'Placeholder') { console.log(field) }
          if (field.constructor.name === 'King' && field.pieceColor === color) {
            king = field;
          }
        })
      });
      return king;
    },
    getPiecesFor: (state) => (color) => {
      let pieces = [];
      state.board.forEach((row) => {
        row.forEach((field) => {
          if (field.isPiece() && field.pieceColor === color) {
            pieces.push(field);
          }
        })
      });
      return pieces;
    },
    getPositionFor: (state) => (piece) => {
      let rRow, rCol;
      state.board.find((row) => { row.find((el) => {el === piece})});
      state.board.forEach((row, i) => {
        row.forEach((el, j) => {
          if (el === piece) {
            rRow = i;
            rCol = j;
          }
        })
      })
      return { row: rRow, column: rCol }
    }
  }
}