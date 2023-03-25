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
      <div class="field-container">
        <div class="d-flex choose-mode-container">
          <select
            class="form-select"
            id="floatingSelect"
            aria-label="Selcet game mode"
            v-model="selectedMode"
          >
            <option disablesd value="">Pick mode...</option>
            <option v-for="mode in gameMods" :key="mode.id" :value="mode">
              {{ mode.name }}
            </option>
          </select>
          <button class="btn btn-primary" @click="generateGrid">Start</button>
        </div>
        <div class="grid-container">
          <template v-if="!selectedMode || !grid">
            <div class="empty-container">
              <h3>Empty Field</h3>
              <h4>Please choose the game mode</h4>
            </div>
          </template>
          <template v-else>
            <div v-for="row in grid" :key="row[0].y" class="grid-row">
              <div
                v-for="square in row"
                :key="square.x"
                class="grid-square"
              ></div>
            </div>
          </template>
        </div>
      </div>
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
  data() {
    return {
      selectedMode: "",
      grid: [],
    };
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
    generateGrid() {
      this.grid = this.calculateGrid();
    },
    calculateGrid() {
      if (!this.selectedMode) {
        return [];
      }
      const size = this.selectedMode.field;
      const grid = [];
      for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
          row.push({ x: j, y: i });
        }
        grid.push(row);
      }
      return grid;
    },
  },
  mounted() {
    this.fetchModes();
  },
};
</script>

<style lang="scss" scoped>
:root {
  --field-size: {{ selectedMode.field }};
}

.field-container {
  width: 650px;
  padding: 2.5rem;

  .choose-mode-container {
    margin-bottom: 2rem;
    select {
      width:200px;
      margin-right: 1rem;
    }
  }

  .grid-container {
    width: fit-content;
    display: grid;
    grid-template-columns: repeat(var(--field-size), 1fr);
    grid-template-rows: repeat(var(--field-size), 1fr);
    gap: 1px;
    border: 1px solid gray;

  .empty-container {
    padding: 2.5rem;
  }

  .grid-row {
    display: flex;
    flex-wrap: wrap;
  }
  .grid-square {
    width: 25px;
    height: 25px;
    margin: 5px;
    background-color: white;
    border: 1px solid gray;
  }
  }
}
</style>
