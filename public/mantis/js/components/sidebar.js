(() => {
    const SIDEBAR = $(".mu-sidebar");
    const PRIME_NAV = $(".prime_nav");
    const GROUPS = $(".menu-group");

    GROUPS.MU.perform((x) => {
        let ul = x.MU.$(":scope >ul", true).MU;
        x.MU.cache("ul", ul);
        ul.css("transition", "none");
        let isActive = ul.hasClass("active");
        ul.addClass("active");
        ul.data("height", ul.node.clientHeight + "px");
        ul.removeCss("transition", "none");
        if (!isActive) {
            ul.css("height", "0px");
            ul.removeClass("active");
        }
        x.MU.on("click", () => {
            let ul = x.MU.cache("ul");
            GROUPS.MU.perform((y) => y.MU.cache("ul").removeClass("active").css("height", '0px'));
            ul.addClass("active").css("height", ul.data("height"));
        });
    });
})();
