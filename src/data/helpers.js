const fs = require("fs")
const yaml = require("yaml")

function checkUrl(url, page) {
    return url && (url === page || (url.length > 1 && page.includes(url)));
}

module.exports = () => {
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
    }
}