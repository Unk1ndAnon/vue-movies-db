<template>
  <div class="navbar-component">
    <v-app-bar
      :clipped-left="clipped"
      :fixed="fixed"
      color="primary"
      dark
      app
      :prominent="prominent"
      class="elevation-0"
    >
      <v-app-bar-nav-icon href="/">
        <v-icon>fa-film</v-icon>
      </v-app-bar-nav-icon>
      <v-spacer />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon @click="switchTheme()">
        <v-icon>{{ darkMode ? "fas" : "far" }} fa-moon</v-icon>
      </v-app-bar-nav-icon>

      <template v-slot:extension>
        <v-tabs align-cemter fixed-tabs>
          <template v-for="(item, i) in links">
            <v-tab
              :key="i"
              v-if="!item.hidden"
              :to="item.to"
              router
              exact
              active-class="white--text"
            >
              <v-icon class="mx-2">fa-{{ item.icon }}</v-icon>
              <span>{{ item.title }}</span>
            </v-tab>
          </template>
        </v-tabs>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import { general } from "@/mixins/navbar.js";

export default {
  mixins: [general],
};
</script>
