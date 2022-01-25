import { createStore } from 'vuex';
import TableModule from '@/store/modules/table'
import GameModule from '@/store/modules/game'

export default createStore({
  strict: true,
  modules: {
    table: TableModule,
    game: GameModule
  },
});