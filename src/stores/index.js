import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      info: {},
    };
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
  },
});

export default store;
