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
        <v-card
          class="mx-auto"
          elevation="5"
          route
          :href="'movie/' + kebabCase(item.title)"
          shaped
        >
          <v-hover v-slot="{ hover }">
            <v-img :height="300" :src="item.poster">
              <v-expand-transition>
                <v-overlay v-if="hover" absolute>
                  <v-card-title class="headline" color="primary">
                    {{ item.title }}
                  </v-card-title>
                  <h4 class="text-center">{{ item.vote_average }}/10</h4>
                </v-overlay>
              </v-expand-transition>
            </v-img>
          </v-hover>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      v-if="!isEmpty(list)"
      :length="totalPages"
      v-model="page"
      class="my-4"
      circle
      total-visible="5"
      @input="paginate"
    ></v-pagination>
  </v-container>
</template>

<script>
import { kebabCase, isEmpty } from "lodash";

export default {
  name: "Home",
  data: () => ({
    list: [],
    searchedValue: "",
    page: 1,
    totalPages: 1,
  }),
  methods: {
    kebabCase: c => kebabCase(c),
    isEmpty: c => isEmpty(c),
    paginate: n => {
      this.page = n;
      this.fetchData(n);
    },
    fetchData(p) {
      this.$store.getters.tmdb.misc.popular(p, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.totalPages = res.total_pages;
          this.list = [];
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
  },
  mounted() {
    this.fetchData(this.page);
  },
};
</script>
