<template>
  <div>
    <div class="mainContent">
      <div v-for="(boardRow, row) in board" :key="row" class="tableRow">
        <TableCube 
          v-for="(boardEl, column) in boardRow" 
          :key="column" 
          :className="getNextColor()" 
          :value="`${row}${column}`"

          :piece="board[row][column]"/>
      </div>
    </div>
    <div>
      <button @click="movePawn">Move</button>
    </div>
  </div>
</template>

<script>
// :value="`${rowMapper(row)}${columnMapper(column)}`"
import TableCube from '@/components/TableCube.vue';
import Position from '@/models/position';

export default {
  name: 'Table',
  components: { TableCube },
  data() {
    return {
      cubeColor: 'white',
      colorIndex: 0
    }
  },
  computed: {
    board() {
      return this.$store.state.table.board
    },
  },
  methods: {
    getNextColor() {
      this.cubeColor = this.cubeColor === 'white' ? 'black' : 'white'
      if (this.colorIndex === 8) {
        this.cubeColor = this.cubeColor === 'black' ? 'white' : 'black'
        this.colorIndex = 0;
      }
      this.colorIndex += 1;
      return this.cubeColor;
    },
    rowMapper(value) {
      return String.fromCharCode(String(value).charCodeAt(0) + 17);
    },
    columnMapper(value) {
      return value + 1;
    },
    movePawn() {
      this.$store.commit('table/movePiece',
      { 
        oldPosition: new Position({ column: 1, row: 0 }), 
        newPosition: new Position({ column: 3, row: 0 })
      })
    }
  }
} 
</script>

<style>
  .mainContent {
    display: flex;
    width: 680px;
    height: 680px;
  }

  .tableRow {
    display: flex;
    flex-direction: column-reverse;
  }
</style>