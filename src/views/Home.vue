<template>
  <div class="home-component">
    <v-card color="primary" dark>
      <v-container>
        <v-text-field
          class="mt-2"
          v-model="searchedValue"
          filled
          color="dark"
          label="Search For ..."
          clearable
          prepend-icon="fa-search"
          @click:prepend="searchFn"
        ></v-text-field>
      </v-container>
    </v-card>
    <v-container>
      <v-row class="justify-center" v-if="notFound">
        <h3 class="headline text-capitalize py-10">no results found</h3>
      </v-row>
      <v-row class="justify-space-around" v-else>
        <v-col
          v-show="showSkeletonLoader"
          v-for="i in [1, 2, 3]"
          :key="i"
          cols="12"
          xs="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
        <v-col
          v-show="!showSkeletonLoader"
          v-for="item in list"
          :key="item.id"
          cols="12"
          xs="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="mx-auto" elevation="5" shaped>
            <v-hover v-slot="{ hover }">
              <v-img :height="300" :src="item.poster">
                <v-expand-transition>
                  <v-overlay v-if="hover" absolute>
                    <v-card-title class="headline" color="primary">
                      {{ item.title }}
                    </v-card-title>
                    <v-card-text class="text-center">
                      {{ item.vote_average }}/10
                    </v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn
                        color="primary"
                        route
                        :href="'movie/' + kebabCase(item.title)"
                      >
                        show more
                      </v-btn>
                    </v-card-actions>
                  </v-overlay>
                </v-expand-transition>
              </v-img>
            </v-hover>
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        v-if="!isEmpty(list) && !showSkeletonLoader"
        v-model="page"
        :length="totalPages"
        class="my-10"
        total-visible="10"
        @input="mode === 'search' ? fetchData : searchFn"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>
import { kebabCase, isEmpty } from "lodash";

export default {
  name: "Home",
  data: () => ({
    searchedValue: "",
    showSkeletonLoader: true,
    list: [],
    page: 1,
    totalPages: 1,
    mode: "normal",
    notFound: false,
  }),
  methods: {
    kebabCase: c => kebabCase(c),
    isEmpty: c => isEmpty(c),
    updateList(results, totalPages) {
      this.list = [];
      this.notFound = false;
      if (!this.isEmpty(results)) {
        results.map(el => {
          this.$store
            .dispatch("getPosterFullPath", el.poster_path)
            .then(fullPosterPath => {
              el.poster = fullPosterPath;
              this.list.push(el);
            });
        });
        this.totalPages = totalPages;
      } else {
        this.notFound = true;
        this.totalPages = 0;
      }
      this.showSkeletonLoader = false;
    },
    fetchData(p) {
      this.showSkeletonLoader = true;
      this.$store.getters.tmdb.misc.popular(p, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.updateList(res.results, res.total_pages);
        }
      });
    },
    searchFn() {
      const query = this.searchedValue.toString();
      if (!this.isEmpty(query)) {
        this.mode = "search";
        this.showSkeletonLoader = true;
        this.$store.getters.tmdb.search.movie(query, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            this.updateList(res.results, res.total_pages);
          }
        });
      } else {
        this.fetchData();
      }
    },
  },
  mounted() {
    this.fetchData(this.page);
  },
};
</script>
