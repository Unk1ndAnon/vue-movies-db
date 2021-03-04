import Vue from "vue";
import Vuetify from "vuetify/lib";
import en from "vuetify/es5/locale/en";

// import vuetify colors
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify);

const globalPalletteColors = {
  primary: colors.blue.darken4,
  accent: colors.blue.accent1,
  error: colors.red.darken2,
  info: colors.green.lighten1,
  success: colors.green.accent4,
  warning: colors.yellow.darken3,
};

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        ...globalPalletteColors,
        secondary: colors.grey.lighten3,
      },
      dark: {
        ...globalPalletteColors,
        secondary: colors.grey.darken3,
      },
    },
  },
  lang: {
    locales: { en },
    current: "en",
  },
  icons: {
    iconfont: "fa",
  },
});
