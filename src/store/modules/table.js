// import Piece from "../../models/pieces/piece";
import Pawn from "../../models/pieces/pawn";
import Rook from "../../models/pieces/rook";
import Knight from "../../models/pieces/knight";
import Queen from "../../models/pieces/queen";
import King from "../../models/pieces/king";
import Bishop from "../../models/pieces/bishop";
import Position from "../../models/position";
import Placeholder from "../../models/pieces/placeholder";
// import { HISTORY_LOCATION } from '@/static/constants';

const getEmptyState = () => ({
  board: [
    [new Rook('white', new Position({ row: 0, column: 0 })), new Placeholder(),
     new Placeholder(), new Placeholder(), new Placeholder(), new Placeholder(),
     new Pawn('black', new Position({ row: 0, column: 6 })), new Rook('black', new Position({ row: 0, column: 7 }))],

    [new Knight('white', new Position({ row: 1, column: 0 })), new Pawn('white', new Position({ row: 1, column: 1})),
     new Placeholder(), new Placeholder(), new Placeholder(), new Placeholder(),
     new Pawn('black', new Position({ row: 1, column: 6 })), new Knight('black', new Position({ row: 1, column: 7 }))],

    [new Bishop('white', new Position({ row: 2, column: 0 })), new Pawn('white', new Position({row: 2, column: 1})),
     new Placeholder(), new Placeholder(), new Placeholder(), new Placeholder(),
     new Pawn('black', new Position({row: 2, column: 6})), new Bishop('black', new Position({row: 2, column: 7}))],

    [new Queen('white', new Position({ row: 3, column: 0 })), new Pawn('white', new Position({row: 3, column: 1})),
     new Placeholder(), new Placeholder(), new Placeholder(), new Placeholder(),
     new Pawn('black', new Position({row: 3, column: 6})), new Queen('black', new Position({row: 3, column: 7}))],

    [new King('white', new Position({ row: 4, column: 0 })), new Pawn('white', new Position({row: 4, column: 1})),
     new Placeholder(), new Placeholder(), new Placeholder(), new Placeholder(),
     new Pawn('black', new Position({row: 4, column: 6})), new King('black', new Position({row: 4, column: 7}))],

    [new Bishop('white', new Position({ row: 5, column: 0 })), new Pawn('white', new Position({row: 5, column: 1})),
     new Placeholder(), new Placeholder(), new Placeholder(), new Placeholder(),
     new Pawn('black', new Position({row: 5, column: 6})), new Bishop('black', new Position({row: 5, column: 7}))],

    [new Knight('white', new Position({ row: 6, column: 0 })), new Pawn('white', new Position({row: 6, column: 1})),
     new Placeholder(), new Placeholder(), new Placeholder(), new Placeholder(),
     new Pawn('black', new Position({row: 6, column: 6})), new Knight('black', new Position({row: 6, column: 7}))],

    [new Rook('white', new Position({ row: 7, column: 0 })), new Pawn('white', new Position({row: 7, column: 1})),
     new Placeholder(), new Placeholder(), new Placeholder(), new Placeholder(),
     new Pawn('black', new Position({row: 7, column: 6})), new Rook('black', new Position({row: 7, column: 7}))]
  ]
});

export default {
  namespaced: true,
  state: getEmptyState(),
  mutations: {
    movePiece(state, { oldPosition, newPosition }) {
      const piece = state.board[oldPosition.row][oldPosition.column];
      state.board[oldPosition.row][oldPosition.column] = new Placeholder();
      state.board[newPosition.row][newPosition.column] = piece;
      piece.position = newPosition;
      piece.inStartingPosition = false;
    },
    addPlaceholder(state, data) {
      const piece = data.piece;
      const locations = piece.availablePositions(data.getter);
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
    }
  }
}