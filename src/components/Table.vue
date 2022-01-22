<template>
  <div class="mainContent">
    <div v-for="(boardRow, row) in board" :key="row" class="tableRow">
      <TableCube 
        v-for="(boardEl, column) in boardRow" 
        :key="column" 
        :className="getNextColor()" 
        :value="`${rowMapper(row)}${columnMapper(column)}`"
        :piece="board[row][column]"/>
    </div>
  </div>
</template>

<script>

import TableCube from '@/components/TableCube.vue';

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