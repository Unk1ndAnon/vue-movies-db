<template>
  <v-footer :fixed="fixed" app>
    <v-row class="text-capitalize text-center">
      <v-col cols="6" sm="12" md="6">
        <v-icon primary class="mr-2">far fa-copyright</v-icon>
        {{ new Date().getFullYear() }} - {{ title }}
      </v-col>
      <v-col cols="6" sm="12" md="6">
        Created by <b>{{ author }}</b>
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
