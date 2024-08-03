const { FontAwesomeIcon } = require("@campj/eleventy-fa-icons");
const yaml = require("js-yaml");

module.exports = eleventyConfig => {
    eleventyConfig.setQuietMode(true);
    
    eleventyConfig.addNunjucksShortcode("FontAwesomeIcon", FontAwesomeIcon);

    eleventyConfig.addPassthroughCopy({
        "src/assets/": "assets/",
        "src/css/": "css/",
        "favicon.ico": "favicon.ico",
    });

    eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

    return {
        pathPrefix: "/",
        dir: {
            input: "src",
            includes: "includes",
            layouts: "layouts",
            output: "build",
            data: "data"
        }
    }
}