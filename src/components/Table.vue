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
    <PlayerInputMove/>
    <button @click="startGame">START</button>
    <button @click="queensideCastle">Queenside</button>
    <button @click="kingsideCastle">Kingside</button>

    <div>
      <input v-model="customGameInput"/>
      <button @click="customGame">CUSTOM</button>
    </div>
  </div>
</template>

<script>
// :value="`${rowMapper(row)}${columnMapper(column)}`"
import TableCube from '@/components/TableCube.vue';
import PlayerInputMove from '@/components/PlayerInputMove.vue';
import { gameHandler } from '@/utils/mixins/gameHandlerMixin';

export default {
  name: 'Table',
  components: { TableCube, PlayerInputMove },
  mixins: [gameHandler],
  created() {
    this.$store.commit('table/setStartingPosition');
  },
  data() {
    return {
      cubeColor: 'white',
      colorIndex: 0,
      drag: true,
      customGameInput: 'wr00wk40wr70bk47wp26',
    }
  },
  computed: {
    board: {
      get() { return this.$store.state.table.board },
      set(value) { this.$store.commit('table/movePiece', value) }
    },
  },
  methods: {
    startGame() {
      this.$store.commit('table/setStartingPosition');
    },
    customGame() {
      this.$store.commit('table/setStartingPosition', this.customGameInput);
    },
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
    handleInputEntered(e) {
      console.log(e);
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