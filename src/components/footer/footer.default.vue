<template>
  <v-footer :fixed="fixed" app>
    <v-row class="text-capitalize text-center">
      <v-col cols="12" md="6">
        <v-icon primary class="mr-2">far fa-copyright</v-icon>
        {{ new Date().getFullYear() }} - {{ title }}
      </v-col>
      <v-col cols="10" md="5">
        Created by <b>{{ author }}</b>
      </v-col>
      <v-col cols="2" md="1">
        <v-btn
          color="primary"
          @click="$vuetify.goTo('.navbar-component')"
          bottom
          right
          fixed
          fab
        >
          <v-icon>fa-chevron-up</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { general } from "@/mixins/footer";

export default {
  mixins: [general],
};
</script>
