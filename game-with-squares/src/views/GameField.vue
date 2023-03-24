<template>
  <div>
    <h1>FIELD</h1>
    <actions-log></actions-log>
    <template v-if="areGameModsLoading">
      <loading-spinner></loading-spinner>
    </template>
    <template v-else-if="errorMessage">
      <error-message :errorMessage="errorMessage"></error-message>
    </template>
    <template v-else>
      {{ gameMods }}
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ActionsLog from "./ActionsLog.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ErrorMessage from "../components/ErrorMessage.vue";
export default {
  components: {
    ActionsLog,
    LoadingSpinner,
    ErrorMessage,
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

<style lang="scss" scoped></style>
