import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API_KEY: "ae8b2044b3cfca0fd7cf9a8f0708b51c",
    API_BASE_URL: "https://api.themoviedb.org/3/movie/",
    posterHost: "https://images.tmdb.org/t/p/w1280",
    testIMG: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
  },
  actions: {
    getPopularMovies({ state: { API_KEY, API_BASE_URL } }) {
      let n = 1;
      return fetch(
        `${API_BASE_URL}popular?api_key=${API_KEY}&language=en-US&page=${n}`,
      )
        .then(res => res.json())
        .then(({ results }) => {
          // filter adults
          results = results.filter(el => !el.adult);
          return results;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPoster({ state: { posterHost, testIMG } }, poster) {
      if (poster) {
        return posterHost + poster;
      } else {
        return testIMG;
      }
    },
  },
});
