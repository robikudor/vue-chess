const getEmptyState = () => ({
  whitePlayer: {},
  blackPlayer: {},
  currentRound: this.whitePlayer,
  // history: new History,
})

export default {
  namespaced: true,
  state: getEmptyState(),
}