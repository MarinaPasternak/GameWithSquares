<template>
  <div>
    <h1>FIELD</h1>
    <p>{{ gameMods }}</p>
    <actions-log></actions-log>
  </div>
</template>

<script>
import ActionsLog from "./ActionsLog.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    ActionsLog,
  },
  computed: {
    ...mapState({
      gameMods: (state) => state.modes,
      areGameModsLoading: (state) => state.requestLoading,
      errorMessage: (state) => state.requestError,
    }),
  },
  methods: {
    ...mapActions(["fetchModes"]),
  },
  mounted() {
    this.fetchModes();
  },
};
</script>

<style lang="sass" scoped></style>
