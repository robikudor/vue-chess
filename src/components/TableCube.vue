<template>
  <div :class="[className, 'tile']" @mousedown="handleClick">
    <div class="tableIndex absolutePos">{{value}}</div>
    <img v-if="piece.isPiece()" :src="piece.pieceImg" class="full absolutePos">
    <div v-if="piece" :class="[piece.style, 'pieceStyle', 'absolutePos', 'full']"></div>
  </div>
</template>

<script>
import { gameHandler } from '@/utils/mixins/gameHandlerMixin';
import Field from "@/models/pieces/field"

export default {
  name: 'TableCube',
  props: {
    className: {
      type: String,
      required: true
    },
    piece: {
      type: Field
    },
    value: {
    }
  },
  mixins: [gameHandler],
  computed: {
    board() {
      return this.$store.state.table.board;
    },
    locationVerifier() {
      return this.$store.getters['table/getPieceAt'];
    },
    playerTurnColor() {
      return this.$store.getters['game/playerTurnColor'];
    },

  },
  methods: {
    handleClick() {
      if (!this.selectedPiece && !this.piece.isPiece()) {
        return;
      }

      if (!this.selectedPiece && this.piece.isPiece()) {
        this.setSelectedPiece();
        return;
      }

      if (this.selectedPiece && this.selectedPiece == this.piece) {
        this.cancelMove();
        return;
      }

      if (!this.newPosition && (!this.piece.isPiece() || !this.piece.pieceColor !== this.playerTurnColor)) {
        this.handleMoveLocation();
      }
    },
    setSelectedPiece() {
      if (this.piece.pieceColor !== this.playerTurnColor) { return; }
      this.$store.commit('game/setSelectedPiece', this.piece);
      this.showAvailablePositions();
    },
    cancelMove() {
      this.$store.commit('game/setSelectedPiece', null);
      this.$store.commit('table/clearPlaceholders');
    },
    handleMoveLocation() {
      const position = this.getPosition();
      this.$store.commit('game/setNewPosition', position);
      if (!this.movePiece(this.selectedPiece, position)) {
        this.$store.commit('table/clearPlaceholders');
        console.log('Can\'t move there!');
      }
      this.$store.commit('game/setSelectedPiece', null);
      this.$store.commit('game/setNewPosition', null);
    },
    getPosition() {
      return this.$store.getters['table/getPositionFor'](this.piece);
    }
  }
}
</script>

<style scoped>
  .white {
    background-color: #EAD2B4;
  }

  .black {
    background-color: #805f3c;
  }

  .tile {
    width: 85px;
    height: 85px;
    position: relative;
  }

  .full {
    width: 100%;
    height: 100%;
  }

  .tableIndex {
    position: absolute;
    left: 2px;
    top: 2px;
    height: 0px;
  }

  .full {
    width: 100%;
    height: 100%;
  }

  .selectedPiece {
    background-color: green;
    opacity: 20%;
  }

  .targetPiece {
    background-color: red;
    opacity: 20%;
  }

  .targetPosition {
    background-image: url('~@/assets/placeholder.svg');
  }

  .historyLocation {
    background-color: yellow;
    opacity: 20%;
  }

  .absolutePos {
    position: absolute;
  }
</style>