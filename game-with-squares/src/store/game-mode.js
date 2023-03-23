import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    modes: null,
    requestError: null,
    requestLoading: false,
  },
  mutations: {
    setModes(state, modes) {
      state.modes = modes
    },
    setLoading(state, loading) {
        state.requestLoading = loading;
    },
    setError(state, error) {
        state.requestError = error;
    }
  },
  actions: {
    async fetchModes({ commit }) {
        commit('setLoading', true);
        
        try {
            const response = await axios.get('https://60816d9073292b0017cdd833.mockapi.io/modes');
            commit('setLoading', false);
            commit('setModes', response.data)
        } catch (error) {
            commit('setError', error.message);
            commit('setLoading', false);
        }
    }
  },
})

export default store
