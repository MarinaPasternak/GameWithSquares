<template>
  <div class="actions-log">
    <h2>Hovered Squares:</h2>
    <template v-if="hoveredSquares.length === 0">
      <h3>There are no actions yet</h3>
    </template>
    <template v-else>
      <div class="container">
        <div
          class="card"
          :class="{
            blue: square.hovered,
            white: !square.hovered,
          }"
          v-for="(square, index) in hoveredSquares"
          :key="index"
        >
          column: {{ square.x + 1 }}, row: {{ square.y + 1 }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    hoveredSquares: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.actions-log {
  padding-right: 2.5rem;

  h2 {
    margin-bottom: 2rem;
  }

  h3 {
    color: rgb(144, 144, 144);
  }
  .container {
    max-height: 450px;
    overflow: auto;
  }
  .card {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: rgba(255, 201, 134, 0.732);
    color: rgb(101, 47, 22);
  }
}
</style>
