<template>
  <v-container>
    <v-row class="justify-space-between">
      <v-text-field
        v-model="searchedValue"
        filled
        label="Search For ..."
        clearable
      ></v-text-field>
      <v-btn color="primary" x-large>
        <v-icon class="ma-2">fa-search</v-icon>
      </v-btn>
    </v-row>
    <v-row class="justify-space-around">
      <v-col
        v-for="item in list"
        :key="item.id"
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="mx-auto" elevation="5">
          <v-img :height="300" :src="getPoster(item.poster_path)"> </v-img>

          <v-card-title primary-title>{{ item.title }}</v-card-title>

          <v-subheader>{{ item.release_date }}</v-subheader>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="item.vote_average"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
            </v-row>
          </v-card-text>

          <v-card-actions class="pa-0">
            <v-btn
              color="primary"
              dark
              block
              route
              :href="'movie/' + kebabCase(item.title)"
            >
              <span class="mx-2">show details</span>
              <v-icon>fa-angle-double-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { kebabCase } from "lodash";

export default {
  name: "Home",
  data: () => ({
    apiURL: "https://api.themoviedb.org/3/movie/popular?api_key=",
    testIMG: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
    photosHost: "https://images.tmdb.org/t/p/w1280",
    list: [],
    searchedValue: "",
  }),
  computed: {
    url() {
      return this.apiURL + this.apiKey + "&language=en-US&page=1";
    },
  },
  methods: {
    kebabCase: c => kebabCase(c),
    getPoster(poster) {
      if (poster) {
        return this.photosHost + poster;
      } else {
        return this.testIMG;
      }
    },
  },
  mounted() {
    this.$store.dispatch("getPopularMovies").then(res => {
      this.list = res;
      console.log(res[0]);
    });
  },
};
</script>
