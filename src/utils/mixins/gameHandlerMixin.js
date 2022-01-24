import { SELECTED_PIECE } from '@/static/constants';
import Position from '../../models/position';

export const gameHandler = {
  data() {
    return {
      selectedPiece: null,
      newPosition: null,
      // move this to store
      playerTurn: {
        color: 'black'
      }
    }
  },
  computed: {
    locationVerifier() {
      return this.$store.getters['table/getPieceAt'];
    },
  },
  methods: {
    movePiece(currentPiece, newPosition) {
      if (currentPiece.canMoveTo(newPosition, this.locationVerifier)) {
        this.$store.commit('table/movePiece',
        {
          oldPosition: currentPiece.position,
          newPosition: newPosition
        })
        this.$store.commit('table/clearPlaceholders');
        return true;
      }
      return false;
    },
    showAvailablePositions() {
      if (!this.selectedPiece) { return; }
      this.checkIfKingIsChecked('black');
      if (this.selectedPiece.showAvailableMoves) {
        this.$store.commit('table/clearPlaceholders');
      } else {
        this.$store.commit('table/clearPlaceholders');
        this.$store.commit('table/addPlaceholder', { piece: this.selectedPiece, getter: this.locationVerifier });
        this.$store.commit('table/setPieceStyle',
          { position: this.selectedPiece.position, style: SELECTED_PIECE });
      }
    },
    // replace color by playerTurn.color from params
    checkIfKingIsChecked() {
      console.log({checked: this.getKing(this.playerTurn.color)
                    .isChecked(this.locationVerifier, this.getPiecesFor('white'))});
    },
    kingsideCastle() {
      const king = this.getKing(this.playerTurn.color);
      const column = king.position.column;
      const rook = this.locationVerifier(new Position({row: 7, column: column}));

      if (king.inStartingPosition && rook.inStartingPosition
          // and fields are empty && king not attacked
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

      if (king.inStartingPosition && rook.inStartingPosition
          // and fields are empty && king not attacked
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

    // getter methods
    getKing(color) {
      return this.$store.getters['table/getKing'](color);
    },
    getPiecesFor(color) {
      return this.$store.getters['table/getPiecesFor'](color);
    },
  }
}