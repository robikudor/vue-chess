import { createStore } from 'vuex';
import TableModule from '@/store/modules/table'

export default createStore({
  strict: true,
  modules: {
    table: TableModule
  },
});