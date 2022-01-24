<template>
  <div :class="[className, 'tile']" @mousedown="showAvailablePositions">
  <!-- <div :class="[className, 'tile']"> -->
    <div class="tableIndex">{{value}}</div>
    <img v-if="piece" :src="piece.pieceImg" class="pieceSvg">
  </div>
</template>

<script>

import Field from "@/models/pieces/field"
// import { mapGetters } from 'vuex';

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
      console.log(this.piece.availablePositions(this.locationVerifier));
      if (this.piece.showAvailableMoves) {
        this.$store.commit('table/clearPlaceholders');
      } else {
        this.$store.commit('table/clearPlaceholders');
        this.$store.commit('table/addPlaceholder', { piece: this.piece, getter: this.locationVerifier });
      }
    }
  }
}
</script>

<style>
  .white {
    background-color: #EAD2B4;
  }

  .black {
    background-color: #805f3c;
  }

  .tile {
    width: 85px;
    height: 85px;
  }

  .pieceSvg {
    width: 100%;
    height: 100%;
  }

  .tableIndex {
    position: relative;
    left: 2px;
    top: 2px;
    height: 0px;
  }
</style>