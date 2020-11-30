const { title, links } = require("../config");

const { author } = require("../../package.json");

module.exports.general = {
  data: () => ({
    fixed: false,
    title,
    links,
    author: author || "no author",
  }),
};
