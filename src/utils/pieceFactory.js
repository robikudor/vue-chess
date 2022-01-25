import Pawn from "@/models/pieces/pawn";
import Rook from "@/models/pieces/rook";
import Knight from "@/models/pieces/knight";
import Queen from "@/models/pieces/queen";
import King from "@/models/pieces/king";
import Bishop from "@/models/pieces/bishop";
import Position from "@/models/position";

export function buildPiece(markup) {
  var [color, piece, row, column] = markup.split('');
  color = markupColor(color);
  piece = markupPiece(piece);
  return new piece(color, new Position({row: row, column: column}));
}

function markupColor(color) {
  switch(color) {
    case 'w':
      color = 'white';
      break;
    case 'b':
      color = 'black';
      break;
  }
  return color;
}

function markupPiece(piece) {
  switch(piece) {
    case 'p':
      piece = Pawn;
      break;
    case 'b':
      piece = Bishop;
      break;
    case 'n':
      piece = Knight;
      break;
    case 'r':
      piece = Rook;
      break;
    case 'q':
    piece = Queen;
    break;
    case 'k':
    piece = King;
    break;
  }
  return piece;
}