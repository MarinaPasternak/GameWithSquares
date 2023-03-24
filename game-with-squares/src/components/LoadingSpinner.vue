<template>
  <div>
    <div class="d-flex justify-content-center">
      <div class="spinner"></div>
      <h2>Loading...</h2>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.spinner {
  width: 2rem;
  height: 2rem;
  margin-right: 1.5rem;
  border: 4px solid var(--bs-tertiary-bg);
  border-top: 4px solid var(--bs-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
