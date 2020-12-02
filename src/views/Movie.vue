<template>
  <v-container>
    <h2>move {{ slug }}</h2>
  </v-container>
</template>

<script>
import { lowerCase } from "lodash";

export default {
  data: () => ({
    slug: "",
  }),
  methods: {
    lowerCase: c => lowerCase(c),
  },
  created() {
    this.slug = this.$route.params.slug;
    this.slug = this.lowerCase(this.slug);

    this.$store.getters.tmdb.search.movie(this.slug, (err, res) => {
      console.log(res.results);
    });
  },
};
</script>
