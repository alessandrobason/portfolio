const fs = require("fs")
const yaml = require("yaml")
const markdown = require("markdown-it");

function checkUrl(url, page) {
    return url && (url === page || (url.length > 1 && page.includes(url)));
}

module.exports = () => {
    const md = new markdown({ html:true });

    return {
        getLinkActiveState(item, page_url) {
            return checkUrl(item.url, page_url) || checkUrl(item.alias, page_url);
        },

        fixSocialLink(link) {
            return link.replace("mailto:", "");
        },

        getContentMaxWidth() {
            return 1100;
        },

        getMaxWidthWithPadding() {
            return this.getContentMaxWidth() + 200;
        },

        parseMdFile(path) {
            const string = fs.readFileSync(path, "utf8").toString();
            return md.render(string);
        },

        parseMd(string) {
            return md.render(string);
        }
    }
}