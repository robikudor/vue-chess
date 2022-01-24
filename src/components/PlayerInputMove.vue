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
        if (piece) {
          this.selectedPiece = piece;
          console.log(piece);
          e.target.value = '';
          return;
        }
      }
      if (!this.newPosition) {
        this.newPosition = position;
        e.target.value = '';

        if (this.movePiece(this.selectedPiece, this.newPosition)) {
          this.selectedPiece = null;
          this.newPosition = null;
        } else {
          console.log('Can\'t move there');
          this.selectedPiece = null;
          this.newPosition = null;
        }
      }
    },
    movePiece(currentPiece, newPosition) {
      // add round logic
      if (currentPiece.canMoveTo(newPosition, this.locationVerifier)) {
        this.$store.commit('table/movePiece',
        { 
          oldPosition: currentPiece.position, 
          newPosition: newPosition
        })
        return true;
      }
      return false;
    }
  }
}
</script>

<style>

</style>