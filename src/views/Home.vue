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
        <div class="primary pa-2">
          <v-card class="mx-auto">
            <v-img height="250" :src="testIMG"> </v-img>

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
              <v-btn color="primary" dark block>
                <span class="mx-2">show details</span>
                <v-icon>fa-angle-double-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    apiKey: "ae8b2044b3cfca0fd7cf9a8f0708b51c",
    apiURL: "https://api.themoviedb.org/3/movie/popular?api_key=",
    testIMG: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
    list: [],
    searchedValue: "",
  }),
  computed: {
    url() {
      return this.apiURL + this.apiKey + "&language=en-US&page=1";
    },
  },
  mounted() {
    fetch(this.url)
      .then(res => res.json())
      .then(({ results }) => {
        // filter adults
        results = results.filter(el => !el.adult);
        this.list = results;
        console.log(results[0]);
      })
      .catch(err => {
        console.log(err);
      });
  },
};
</script>
