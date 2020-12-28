<template>
  <v-container class="about">
    <v-card>
      <v-card-title primary-title class="headline text-capitalize">
        about app
      </v-card-title>
      <v-card-text>
        <v-list-item v-for="(item, i) in items" :key="i" three-line>
          <v-list-item-content class="text-capitalize">
            <v-list-item-title class="grey--text">
              {{ item.label }}
            </v-list-item-title>
            <v-list-item-content class="caption">
              <div v-if="item.label === 'repository'">
                <v-btn :href="item.content" target="_blanc" color="primary">
                  source code
                </v-btn>
              </div>
              <div v-else>
                {{ item.content }}
              </div>
            </v-list-item-content>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import pkg from "../../package.json";
import { lowerCase } from "lodash";

export default {
  data: () => ({
    items: [
      { label: "name", content: lowerCase(pkg.name) },
      { label: "description", content: pkg.description },
      { label: "version", content: pkg.version },
      { label: "author", content: pkg.author },
      { label: "license", content: pkg.license },
      { label: "repository", content: pkg.bugs.url.replace("/issues", "") },
    ],
  }),
  methods: {
    lowerCase: c => lowerCase(c),
  },
};
</script>
