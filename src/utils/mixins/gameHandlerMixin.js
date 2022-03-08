import { SELECTED_PIECE, TARGET_PIECE } from '@/static/constants';
import Position from '../../models/position';

export const gameHandler = {
  computed: {
    locationVerifier() {
      return this.$store.getters['table/getPieceAt'];
    },
    playerTurnColor() {
      return this.$store.getters['game/playerTurnColor'];
    },
    selectedPiece() {
      return this.$store.state.game.selectedPiece;
    },
    newPosition() {
      return this.$store.state.game.newPosition;
    }
  },

  methods: {
    movePiece(currentPiece, newPosition, pieceToPromote) {
      if (pieceToPromote && !['n', 'b', 'r', 'q'].includes(pieceToPromote)) {
        console.log('Can\'t promote to this');
        return false;
      }
      if (currentPiece.canMoveTo(newPosition, this.locationVerifier)) {
        this.$store.commit('table/movePiece',
        {
          oldPosition: currentPiece.position,
          newPosition: newPosition
        });

        this.$store.commit('table/clearPlaceholders');
        if (currentPiece.isPawn() && newPosition.column == this.lastRank()) {
          this.$store.commit('table/swapPiece',
          {
            position: newPosition,
            pieceMarkup: `${this.playerTurnColor[0]}${pieceToPromote}${newPosition.row}${newPosition.column}`
          });
        }

        // const enemyColor = this.$store.getters['game/enemyColor'];
        this.$store.commit('table/updateAvailablePositions',
            {
              getter: this.locationVerifier,
              // enemeyPieces: this.$store.getters['table/getPiecesFor'](this.enemyTurnColor())
            }
            // enemyPieces: this.getPiecesFor(enemyColor)
        );
        this.$store.commit('game/nextPlayer');
        this.checkIfKingIsChecked();

        return true;
      }
      return false;
    },

    showAvailablePositions() {
      if (!this.selectedPiece) { return; }
      if (this.selectedPiece.showAvailableMoves) {
          this.$store.commit('table/clearPlaceholders');
        } else {
          this.$store.commit('table/clearPlaceholders');
          this.$store.commit('table/addPlaceholder', this.selectedPiece);
          this.$store.commit('table/setPieceStyle',
            { position: this.selectedPiece.position, style: SELECTED_PIECE });
      }
    },

    checkIfKingIsChecked() {
      const king = this.getKing(this.playerTurnColor);
      const enemyColor = this.$store.getters['game/enemyColor'];
      if (king.isChecked(this.locationVerifier, this.getPiecesFor(enemyColor))) {
        this.$store.commit('table/setPieceStyle',
          { position: king.position, style: TARGET_PIECE } );
        this.$store.commit('game/kingIsInCheck', true);
      }
    },

    kingsideCastle() {
      const king = this.getKing(this.playerTurnColor);
      const column = king.position.column;
      const rook = this.locationVerifier(new Position({row: 7, column: column}));
      const piece1 = this.locationVerifier(new Position({row: 6, column: column}));
      const piece2 = this.locationVerifier(new Position({row: 5, column: column}));

      if (king.inStartingPosition && rook && rook.inStartingPosition &&
          !piece1 && !piece2
          // enemy attacking any zone? 50 60
        ) {
        this.$store.commit('table/movePiece', {
          oldPosition: rook.position,
          newPosition: new Position({row: rook.position.row - 2, column: column})
        });
        this.$store.commit('table/movePiece', {
          oldPosition: king.position,
          newPosition: new Position({row: king.position.row + 2, column: column})
        });
      }
      return false
    },

    queensideCastle() {
      const king = this.getKing(this.playerTurn.color);
      const column = king.position.column;
      const rook = this.locationVerifier(new Position({row: 0, column: column}));
      const piece1 = this.locationVerifier(new Position({row: 3, column: column}));
      const piece2 = this.locationVerifier(new Position({row: 2, column: column}));
      const piece3 = this.locationVerifier(new Position({row: 1, column: column}));

      if (king.inStartingPosition && rook && rook.inStartingPosition &&
          !piece1 && !piece2 && !piece3
          // enemy attacking any zone? 30 20
        ) {
        this.$store.commit('table/movePiece', {
          oldPosition: rook.position,
          newPosition: new Position({row: rook.position.row + 3, column: column})
        });
        this.$store.commit('table/movePiece', {
          oldPosition: king.position,
          newPosition: new Position({row: king.position.row - 2, column: column})
        });
      }
    },

    lastRank() {
      return this.playerTurnColor === 'white' ? 7 : 0;
    },

    // getter methods
    getKing(color) {
      return this.$store.getters['table/getKing'](color);
    },

    getPiecesFor(color) {
      return this.$store.getters['table/getPiecesFor'](color);
    },
  }
}