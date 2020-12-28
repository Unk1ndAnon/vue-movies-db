<template>
  <v-container>
    <h1 class="text-center text-capitalize display-2 mt-4 mb-2">{{ title }}</h1>
    <v-card>
      <v-card-text>
        <v-row class="justify-center">
          <v-col cols="12" sm="12" md="4">
            <v-img :src="poster"></v-img>
          </v-col>
          <v-col cols="12" sm="12" md="8">
            <v-list dense>
              <v-list-item-group>
                <v-list-item v-for="(item, i) in items" :key="i" three-line>
                  <v-list-item-icon>
                    <v-icon color="grey">fas fa-{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="text-capitalize">
                    <v-list-item-title class="grey--text">
                      {{ item.label }}
                    </v-list-item-title>
                    <v-list-item-content class="caption">
                      <template v-if="item.label === 'vote average'">
                        <v-row align="center" class="mx-0">
                          <v-rating
                            :value="item.content"
                            :length="10"
                            color="primary"
                            dense
                            half-increments
                            readonly
                            :size="14"
                          ></v-rating>
                        </v-row>
                      </template>
                      <template v-else>
                        {{ item.content }}
                      </template>
                    </v-list-item-content>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { lowerCase } from "lodash";

export default {
  data: () => ({
    slug: "",
    title: "",
    items: [],
    poster: "",
  }),
  methods: {
    lowerCase: c => lowerCase(c),
  },
  created() {
    // get & fill movie slug
    this.slug = this.$route.params.slug;
    this.slug = this.lowerCase(this.slug);
    this.title = this.slug;

    // get movie data
    this.$store.getters.tmdb.search.movie(this.slug, (err, res) => {
      // get data
      const data = res.results[0];

      // set poster
      this.$store
        .dispatch("getPosterFullPath", data.poster_path)
        .then(fullPosterPath => {
          this.poster = fullPosterPath;
        });

      // fill info list
      this.items.push(
        {
          icon: "heading",
          label: "original title",
          content: data.original_title,
        },
        {
          icon: "language",
          label: "original language",
          content: data.original_language,
        },
        {
          icon: "align-left",
          label: "description",
          content: data.overview,
        },
        {
          icon: "users",
          label: "popularity",
          content: data.popularity,
        },
        {
          icon: "hourglass-start",
          label: "release date",
          content: data.release_date,
        },
        {
          icon: "star",
          label: "vote average",
          content: data.vote_average,
        },
      );
    });
  },
};
</script>
