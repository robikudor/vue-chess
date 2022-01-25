<template>
  <div>
    <input @keyup.enter="handleInputEntered"/>
  </div>
</template>

<script>
import Position from '@/models/position';
import { gameHandler } from '@/utils/mixins/gameHandlerMixin';

export default {
  name: 'PlayerInputMove',
  mixins: [gameHandler],
  methods: {
    handleInputEntered(e) {
      const input = e.target.value;

      if (input.toLowerCase() === 'o-o') {
        e.target.value = '';
        this.kingsideCastle();
        return;
      }
      if (input.toLowerCase() === 'o-o-o') {
        e.target.value = '';
        this.queensideCastle();
        return;
      }

      const pieceToPromote = input[2];
      const position = new Position({ column: input[1], row: input[0]});

      if (!this.selectedPiece) {
        const piece = this.locationVerifier(position);
        // add round logic
        if (piece) {
          this.selectedPiece = piece;
          e.target.value = '';
          this.showAvailablePositions();
          return;
        }
        console.log('No piece on selected field!')
        return;
      }

      if (!this.newPosition) {
        this.newPosition = position;
        e.target.value = '';

        if (!this.movePiece(this.selectedPiece, this.newPosition, pieceToPromote)) {
          console.log('Can\'t move there!');
          this.$store.commit('table/clearPlaceholders');
        }
        this.selectedPiece = null;
        this.newPosition = null;
      }
    },
  }
}
</script>

<style>

</style>