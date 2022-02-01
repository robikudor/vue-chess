const getEmptyState = () => ({
  currentPlayerTurn: 'white',
  selectedPiece: null,
  newPosition: null,
  kingIsInCheck: false,
  history: [],
})

export default {
  namespaced: true,
  state: getEmptyState(),
  mutations: {
    nextPlayer(state) {
      state.currentPlayerTurn = state.currentPlayerTurn === 'white' ? 'black' : 'white';
      // state.history.push({ piece: state.selectedPiece, newPosition: state.newPosition });
      state.selectedPiece = null;
      state.newPosition = null
    },
    setSelectedPiece(state, piece) {
      state.selectedPiece = piece;
    },
    setNewPosition(state, position) {
      state.newPosition = position;
    },
    kingIsInCheck(state, value) {
      state.kingIsInCheck = value;
    }
   },
  getters: {
    playerTurnColor(state) {
      return state.currentPlayerTurn;
    },
    enemyColor(state) {
      return state.currentPlayerTurn === 'white' ? 'black' : 'white';
    },
    kingIsInCheck(state) {
      return state.kingIsInCheck;
    }
  },
}