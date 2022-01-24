// import Piece from "../../models/pieces/piece";
import Pawn from "../../models/pieces/pawn";
import Rook from "../../models/pieces/rook";
import Knight from "../../models/pieces/knight";
import Queen from "../../models/pieces/queen";
import King from "../../models/pieces/king";
import Bishop from "../../models/pieces/bishop";
import Position from "../../models/position";
import Placeholder from "../../models/pieces/placeholder";

const getEmptyState = () => ({
  board: [
    [new Rook('white', new Position({ row: 0, column: 0 })), null, 
    null, null, null, null, 
    new Pawn('black', new Position({ row: 0, column: 6 })), new Rook('black', new Position({ row: 0, column: 7 }))],

   [new Knight('white', new Position({ row: 1, column: 0 })), null, 
    null, null, null, null, 
    new Pawn('black', new Position({ row: 1, column: 6 })), new Knight('black', new Position({ row: 1, column: 7 }))],

   [new Bishop('white', new Position({ row: 2, column: 0 })), new Pawn('white', new Position({row: 2, column: 1})), 
    null, null, null, null,
    new Pawn('black', new Position({row: 2, column: 6})), new Bishop('black', new Position({row: 2, column: 7}))],
    
   [new Queen('white', new Position({ row: 3, column: 0 })), null, 
    null, null, null, null, 
    null, new Queen('black', new Position({row: 3, column: 7}))],

   [new King('white', new Position({ row: 4, column: 0 })), null, 
    null, null, null, null, 
    null, new King('black', new Position({row: 4, column: 7}))],

   [new Bishop('white', new Position({ row: 5, column: 0 })), new Pawn('white', new Position({row: 5, column: 1})), 
    null, null, null, null, 
    new Pawn('black', new Position({row: 5, column: 6})), new Bishop('black', new Position({row: 5, column: 7}))],

   [new Knight('white', new Position({ row: 6, column: 0 })), new Pawn('white', new Position({row: 6, column: 1})), 
    null, null, null, null, 
    new Pawn('black', new Position({row: 6, column: 6})), new Knight('black', new Position({row: 6, column: 7}))],

   [new Rook('white', new Position({ row: 7, column: 0 })), null, 
    null, null, null, null, 
    new Pawn('black', new Position({row: 7, column: 6})), new Rook('black', new Position({row: 7, column: 7}))]
  ]
});

export default {
  namespaced: true,
  state: getEmptyState(),
  mutations: {
    movePiece(state, { oldPosition, newPosition }) {
      const piece = state.board[oldPosition.row][oldPosition.column];
      state.board[oldPosition.row][oldPosition.column] = null;
      state.board[newPosition.row][newPosition.column] = piece;
      piece.position = newPosition;
      piece.pieceIsInStartingPosition = false;
    },
    addPlaceholder(state, data) {
      const piece = data.piece;
      const locations = piece.availablePositions(data.getter);
      locations.forEach(location => {
        const currentPiece = state.board[location.row][location.column]
        state.board[location.row][location.column] = new Placeholder(currentPiece, location);
      });
      piece.showAvailableMoves = true;
    },
    clearPlaceholders(state) {
      state.board.forEach(row => {
        row.forEach(field => {
          if (field && field.constructor.name === 'Placeholder') { 
            const position = field.position;
            state.board[position.row][position.column] = null
          } else if (field && field.isPiece()) {
            field.hideAvailableMoves();
          }
        })
      })
    }
  },
  getters: {
    getPieceAt: (state) => (position) => {
      return state.board[position.row][position.column];
    }
  }
}