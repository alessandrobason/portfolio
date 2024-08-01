const fs = require("fs")
const matter = require("gray-matter")
const glob_lib = require("glob")

function glob(path) {
    return glob_lib.globSync(path, { posix: true });
}

function make(name, url) {
    return { "name": name, "url": url };
}

module.exports = () => {
    let top_links = [
        make("Game Projects", "/projects/"),
        make("Resume / CV", "/resume/"),
        make("Contact", "/contact/"),
    ];

    return {
        top: top_links,
        bottom: []
    };
}