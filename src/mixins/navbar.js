const { title, links } = require("../config");

module.exports.general = {
  data: () => ({
    darkMode: false,
    clipped: false,
    drawer: false,
    fixed: false,
    miniVariant: false,
    right: false,
    rightDrawer: false,
    prominent: false,
    title,
    links,
  }),
  methods: {
    switchTheme() {
      this.$vuetify.theme.dark = this.darkMode = !this.$vuetify.theme.dark;
      console.log("dark mode: " + this.darkMode);
    },
  },
};
