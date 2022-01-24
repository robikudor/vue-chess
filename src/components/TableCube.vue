<template>
  <div :class="[className, 'tile']" @mousedown="showAvailablePositions">
    <div class="tableIndex absolutePos">{{value}}</div>
    <img v-if="piece.isPiece()" :src="piece.pieceImg" class="full absolutePos">
    <div v-if="piece" :class="[piece.style, 'pieceStyle', 'absolutePos', 'full']"></div>
  </div>
</template>

<script>

import Field from "@/models/pieces/field"
import { SELECTED_PIECE } from '@/static/constants'

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
  computed: {
    board() {
      return this.$store.state.table.board;
    },
    locationVerifier() {
      return this.$store.getters['table/getPieceAt'];
    }
  },
  methods: {
    showAvailablePositions() {
      if (!this.piece) { return; }
      if (this.piece.showAvailableMoves) {
        this.$store.commit('table/clearPlaceholders');
      } else {
        this.$store.commit('table/clearPlaceholders');
        this.$store.commit('table/addPlaceholder', { piece: this.piece, getter: this.locationVerifier });
          this.$store.commit('table/setPieceStyle',
            { position: this.piece.position, style: SELECTED_PIECE });
      }
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