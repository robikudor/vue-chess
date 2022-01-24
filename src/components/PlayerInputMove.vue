<template>
  <div>
    <input @keyup.enter="handleInputEntered"/>
  </div>
</template>

<script>
import Position from '@/models/position';

export default {
  name: 'PlayerInputMove',
  data() {
    return {
      selectedPiece: null,
      newPosition: null
    }
  },
  computed: {
    locationVerifier() {
      return this.$store.getters['table/getPieceAt'];
    }
  },
  methods: {
    handleInputEntered(e) {
      const input = e.target.value;
      const position = new Position({ column: input[1], row: input[0]});

      if (!this.selectedPiece) {
        const piece = this.locationVerifier(position);
        // add round logic
        if (piece) {
          this.selectedPiece = piece;
          // highlight selected piece && possible moves
          console.log(piece);
          e.target.value = '';
          this.showAvailablePositions()
          return;
        }
        console.log('No piece on selected field!')
        return;
      }

      if (!this.newPosition) {
        this.newPosition = position;
        e.target.value = '';

        if (!this.movePiece(this.selectedPiece, this.newPosition)) {
          console.log('Can\'t move there!');
          this.$store.commit('table/clearPlaceholders');
        }
        this.selectedPiece = null;
        this.newPosition = null;
      }
    },
    movePiece(currentPiece, newPosition) {
      if (currentPiece.canMoveTo(newPosition, this.locationVerifier)) {
        this.$store.commit('table/movePiece',
        { 
          oldPosition: currentPiece.position, 
          newPosition: newPosition
        })
        this.$store.commit('table/clearPlaceholders');
        return true;
      }
      return false;
    },
    showAvailablePositions() {
      if (!this.selectedPiece) { return; }
      if (this.selectedPiece.showAvailableMoves) {
        this.$store.commit('table/clearPlaceholders');
      } else {
        this.$store.commit('table/clearPlaceholders');
        this.$store.commit('table/addPlaceholder', { piece: this.selectedPiece, getter: this.locationVerifier });
      }
    }
  }
}
</script>

<style>

</style>