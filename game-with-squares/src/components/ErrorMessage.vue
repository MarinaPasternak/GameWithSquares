<template>
  <div>
    <div class="error-container">
      <h2>Ops somthing, went wrong....</h2>
      <h3>Error: {{ errorMessage }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ["errorMessage"],
};
</script>

<style lang="scss" scoped>
.error-container {
  h3 {
    color: var(--bs-danger);
  }
}
</style>
