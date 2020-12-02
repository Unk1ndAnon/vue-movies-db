import Vue from "vue";
import Vuex from "vuex";

// import themovieDB library
import tmdb from "tmdbv3";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API_KEY: "ae8b2044b3cfca0fd7cf9a8f0708b51c",
    API_BASE_URL: "https://api.themoviedb.org/3/movie/",
    posterHost: "https://images.tmdb.org/t/p/w1280",
    testIMG: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
  },
  getters: {
    tmdb({ API_KEY }) {
      return tmdb.init(API_KEY);
    },
  },
  actions: {
    getPoster({ state: { posterHost, testIMG } }, poster) {
      if (poster) {
        return posterHost + poster;
      } else {
        return testIMG;
      }
    },
  },
});
