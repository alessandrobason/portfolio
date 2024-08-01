const { FontAwesomeIcon } = require("@campj/eleventy-fa-icons");

module.exports = eleventyConfig => {
    eleventyConfig.setQuietMode(true);
    
    eleventyConfig.addNunjucksShortcode("FontAwesomeIcon", FontAwesomeIcon);

    eleventyConfig.addPassthroughCopy({
        "src/assets/": "assets/",
        "src/css/": "css/"
    });

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