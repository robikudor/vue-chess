<template>
  <div :class="[className, 'tile']">
    <div class="tableIndex">{{value}}</div>
    <img v-if="piece" :src="piece.pieceImg" class="pieceSvg"/>
    <!-- <div class="piece">{{piece}}</div> -->
  </div>
</template>

<script>

import Piece from "@/models/pieces/piece"

export default {
  name: 'TableCube',
  props: {
    className: {
      type: String,
      required: true
    },
    piece: {
      type: Piece
    },
    value: {

    }
  },
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