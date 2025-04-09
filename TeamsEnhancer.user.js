// ==UserScript==
// @name         Teams Enhancer
// @namespace    https://bitbucket.org/achernyakevich/tmsp-teamsenhancer/
// @version      0.1.0
// @description  Microsoft Teams (web version) enhancer. It helps to handle unread messages, etc.
// @author       Alexander Chernyakevich
// @match        https://teams.live.com/v2*
// @grant        GM_notification
// @grant        GM_log
// ==/UserScript==

(function () {
    'use strict';

    const LOG_DEBUG = true;
    const SHOW_NOTIFICATION = false;
    const UNREAD_STATUS = "unread";
    const TEAMS_FAVICON = "https://statics.teams.cdn.live.net/evergreen-assets/icons/microsoft_teams_logo_refresh.ico";
    const TEAMS_FAVICON_UNREAD = "https://bitbucket.org/achernyakevich/tmsp-teamsenhancer/raw/main/images/microsoft_teams_logo_unread.ico";

    let checkTimeout = 30000;

    function log(logStr) {
        if ( LOG_DEBUG ) {
            GM_log(logStr);
        }
    }

    function showNotification() {
        log("Unread found.");
        GM_notification({
            title: "Teams Warning",
            text: "You have unread messages or activities in Teams for account of " +
                  document.getElementsByClassName("fui-Avatar")[0].ariaLabel.substring(19),
            timeout: checkTimeout,
            image: TEAMS_FAVICON,
            onclick: function () {}
        });
    }

    function changeFavicon(status) {
        if ( status == UNREAD_STATUS ) {
            document.getElementById("teams-favicon").href = TEAMS_FAVICON_UNREAD;
        } else {
            document.getElementById("teams-favicon").href = TEAMS_FAVICON;
        }
    }

    function checkUnreadBlocks() {
        log("Checking...");
        if ( document.getElementsByClassName("fui-CounterBadge").length > 0 ) {
            if ( SHOW_NOTIFICATION ) {
                showNotification();
            }
            changeFavicon(UNREAD_STATUS);
        } else {
            changeFavicon();
        }
    }

    setInterval(checkUnreadBlocks, checkTimeout);
    GM_log("Teams Enhancer started (checking interval: " + checkTimeout + "ms).");
})();
