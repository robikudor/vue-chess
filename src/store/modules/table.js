// import Piece from "../../models/pieces/piece";
import Pawn from "../../models/pieces/pawn";
import Rook from "../../models/pieces/rook";
import Knight from "../../models/pieces/knight";
import Queen from "../../models/pieces/queen";
import King from "../../models/pieces/king";
import Bishop from "../../models/pieces/bishop";

const getEmptyState = () => ({
  // board: Array(8).fill(null)
  //                .map(() => new Array(8).fill(null).map(() => new Pawn('black'))),

  board: [
    [new Rook('white'), new Pawn('white'), null, null, null, null, new Pawn('black'), new Rook('black')],
    [new Knight('white'), new Pawn('white'), null, null, null, null, new Pawn('black'), new Knight('black')],
    [new Bishop('white'), new Pawn('white'), null, null, null, null, new Pawn('black'), new Bishop('black')],
    [new Queen('white'), new Pawn('white'), null, null, null, null, new Pawn('black'), new Queen('black')],
    [new King('white'), new Pawn('white'), null, null, null, null, new Pawn('black'), new King('black')],
    [new Bishop('white'), new Pawn('white'), null, null, null, null, new Pawn('black'), new Bishop('black')],
    [new Knight('white'), new Pawn('white'), null, null, null, null, new Pawn('black'), new Knight('black')],
    [new Rook('white'), new Pawn('white'), null, null, null, null, new Pawn('black'), new Rook('black')]
  ]
});

export default {
  namespaced: true,
  state: getEmptyState(),
}

