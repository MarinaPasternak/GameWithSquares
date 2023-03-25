<template>
  <div>
    <template v-if="areGameModsLoading">
      <loading-spinner></loading-spinner>
    </template>
    <template v-else-if="errorMessage">
      <error-message :errorMessage="errorMessage"></error-message>
    </template>
    <template v-else>
      <div class="d-flex flex-row-reverse justify-content-center">
        <actions-log :hoveredSquares="hoveredSquares"></actions-log>
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
            <template v-if="!selectedMode || grid.length === 0">
              <button class="btn btn-primary" @click="generateGrid">
                Start
              </button>
            </template>
            <template v-else>
              <button class="btn btn-primary" @click="generateGrid">
                Restart
              </button>
            </template>
          </div>
          <div class="grid-container">
            <template v-if="!selectedMode || grid.length === 0">
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
                  :class="{
                    blue: square.hovered,
                    white: !square.hovered,
                  }"
                  @mouseover="onSquareHover(square)"
                ></div>
              </div>
            </template>
          </div>
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
      hoveredSquares: [],
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
      this.grid = [];
      this.hoveredSquares = [];

      const fieldSize = this.selectedMode.field;

      for (let i = 0; i < fieldSize; i++) {
        const row = [];
        for (let j = 0; j < fieldSize; j++) {
          row.push({ x: j, y: i, hovered: false });
        }
        this.grid.push(row);
      }
    },
    onSquareHover(square) {
      const squareIndexToDelete = this.hoveredSquares.findIndex(
        (item) => item.x === square.x && item.y === square.y
      );

      if (square.hovered && squareIndexToDelete !== -1) {
        square.hovered = false;
        this.hoveredSquares.splice(squareIndexToDelete, 1);
      } else {
        square.hovered = true;
        this.hoveredSquares.push(square);
      }
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
    border: 1px solid gray;

  .empty-container {
    padding: 2.5rem;
  }

  .grid-row {
    display: flex;
    flex-wrap: wrap;
  }
  .grid-square {
    width: 30px;
    height: 30px;
    border: 1px solid gray;
    &.blue {
      background-color: rgb(30, 166, 250);
    }

    &.white {
      background-color: white;
    }
  }
  }
}
</style>
