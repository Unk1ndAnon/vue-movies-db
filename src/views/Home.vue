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
          <v-img :height="300" :src="item.poster">
            <v-overlay absolute>
              <v-card-title color="primary">{{ item.title }}</v-card-title>
            </v-overlay>
          </v-img>

          <!-- <v-card-title primary-title>{{ item.title }}</v-card-title> -->

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
    list: [],
    searchedValue: "",
  }),
  methods: {
    kebabCase: c => kebabCase(c),
  },
  mounted() {
    let n = 1;
    this.$store.getters.tmdb.misc.popular(n, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        res.results.map(el => {
          this.$store
            .dispatch("getPoster", el.poster_path)
            .then(fullPosterPath => {
              el.poster = fullPosterPath;
              this.list.push(el);
            });
        });
      }
    });
  },
};
</script>
