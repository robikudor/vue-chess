<template>
  <div class="mainContainer">
    <aside class="leftContent">Left part
      <pre>{{game}}</pre>
      <pre>{{board}}</pre>
    </aside>
    <div class="mainContent">
      <Table>
      </Table>
    </div>
    <div class="rightContent">History</div>
  </div>
</template>

<script>

import Table from '@/components/Table.vue';

export default {
  name: 'App',
  components: {
    Table
  },
  computed: {
    board() {
      return this.$store.state.table.board
    },
    game() {
      return this.$store.state.game
    }
  },
}
</script>

<style>
.mainContainer {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between  ;
}

.leftContent {
  width: 25%;
}

.mainContent {
  width: 680px;
  height: 680px;
}

.rightContent {
  width: 25%;
}
</style>
