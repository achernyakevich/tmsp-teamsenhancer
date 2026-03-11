// ==UserScript==
// @name         Teams Enhancer
// @namespace    https://github.com/achernyakevich/tmsp-teamsenhancer/
// @updateURL    https://github.com/achernyakevich/tmsp-teamsenhancer/raw/refs/heads/main/TeamsEnhancer.user.js
// @downloadURL  https://github.com/achernyakevich/tmsp-teamsenhancer/raw/refs/heads/main/TeamsEnhancer.user.js
// @version      0.6-SNAPSHOT
// @description  Microsoft Teams (web version) enhancer. It helps to handle unread messages, etc.
// @author       Alexander Chernyakevich
// @match        https://teams.live.com/v2*
// @match        https://teams.microsoft.com/v2*
// @match        https://teams.cloud.microsoft/*
// @grant        GM_notification
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_registerMenuCommand
// @grant        GM_log
// @require      https://bitbucket.org/achernyakevich/tmsp-common/raw/configHelper-0.1.3/configHelper.js
// ==/UserScript==

(function () {
    'use strict';

    const UNREAD_STATUS = "unread";
    const TEAMS_FAVICON = "https://statics.teams.cdn.live.net/evergreen-assets/icons/microsoft_teams_logo_refresh.ico";
    const TEAMS_FAVICON_UNREAD = "https://raw.githubusercontent.com/achernyakevich/tmsp-teamsenhancer/refs/heads/main/images/microsoft_teams_logo_unread.ico";

    const CONFIG_NAMESPACE = "teams-enhancer";
    const DEFAULT_CONFIG = {
        "ui": {
            "startupDelay": 30000,
            "chatTextSize": 3,
            "sidePanelSize": 350,
            "inviteToTeamsVisibility": false
        },
        "notification": {
            "checkTimeout": 30000,
            "showNotification": false
        },
        "debug": false,
    }
    const config = (
        configHelper.getConfigString(CONFIG_NAMESPACE)
            ? configHelper.getConfig(CONFIG_NAMESPACE)
            : DEFAULT_CONFIG
    );

    function log(logStr) {
        if (config.debug) {
            GM_log(logStr);
        }
    }

    function adjustChatTextSize(size) {
        if (size >= 1 && size <= 5) {
            let style = document.getElementById("chatTextSizeStyle");
            if (!style) {
                style = document.createElement('style');
                style.id = "chatTextSizeStyle";
                document.head.appendChild(style);
            }
            style.textContent = `
              .fui-ChatMyMessage__body, .fui-ChatMessage__body { font-size: var(--fontSizeBase${size}00) !important; }
              .fkhj508>div.fui-Primitive { font-size: var(--fontSizeBase${size}00); }
            `;
        }
    }

    function promptAndAdjustChatTextSize() {
        const size = prompt("Enter chat text font size (1-5):");
        const sizeNumber = parseInt(size, 10);
        if (!isNaN(sizeNumber) && sizeNumber >= 1 && sizeNumber <= 5) {
            adjustChatTextSize(sizeNumber);
        } else {
            alert("Invalid input. Please enter a number between 1 and 5.");
        }
    }

    function adjustSidePanelSize(size) {
        if (size >= 250 && size <= 500) {
            document.querySelectorAll('[data-tid="app-layout-area--sub-nav"]')[0]?.style.setProperty("--slot-width", `${size}px`);
        }
    }

    function promptAndAdjustSidePanelSize() {
        const size = prompt("Enter side panel size (250-500):");
        const sizeNumber = parseInt(size, 10);
        if (!isNaN(sizeNumber) && sizeNumber >= 250 && sizeNumber <= 500) {
            adjustSidePanelSize(sizeNumber);
        } else {
            alert("Invalid input. Please enter a number between 250 and 500.");
        }
    }

    function toggleInviteToTeamsButton() {
        const styleId = "inviteToTeamsVisibilityStyle";
        let style = document.getElementById(styleId);
        if (!style) {
            style = document.createElement('style');
            style.id = styleId;
            document.head.appendChild(style);
            style.textContent = 'div[data-tid="chat-list-layout"]>button.fui-Button {display: none}';
        } else {
            style.remove();
        }
    }

    function showNotification() {
        log("Unread found.");
        GM_notification({
            title: "Teams Warning",
            text: "You have unread messages or activities in Teams for account of " +
                document.getElementsByClassName("fui-Avatar")[0].ariaLabel.substring(19),
            timeout: config.notification.checkTimeout,
            image: TEAMS_FAVICON,
            onclick: function () { }
        });
    }

    function changeFavicon(status) {
        if (status == UNREAD_STATUS) {
            document.getElementById("teams-favicon").href = TEAMS_FAVICON_UNREAD;
        } else {
            document.getElementById("teams-favicon").href = TEAMS_FAVICON;
        }
    }

    function checkUnreadBlocks() {
        log("Checking...");
        if (document.getElementsByClassName("fui-CounterBadge").length > 0) {
            if (config.notification.showNotification) {
                showNotification();
            }
            changeFavicon(UNREAD_STATUS);
        } else {
            changeFavicon();
        }
    }

    function startMeetNowCall(isVideoCall) {
        let callButton = null;
        let meetNowDropDownButton = document.querySelectorAll('[data-tid="audio-drop-in-more-options-button"]')[0];
        if (meetNowDropDownButton) {
            meetNowDropDownButton.click();
            callButton = document.querySelectorAll(
                '[data-tid="audio-drop-in-dropdown-menu-item-' + (isVideoCall ? "video" : "audio") + '-button"]'
            )[0];
        } else {
            callButton = document.querySelectorAll(
                '[data-tid="chat-call-' + (isVideoCall ? "video" : "audio") + '-button"]'
            )[0];
        }
        if (callButton) {
            callButton.click();
        } else {
            GM_log("No Call Button Found.");
        }
    }

    setInterval(checkUnreadBlocks, config.notification.checkTimeout);
    log("Teams Enhancer: started (checking interval: " + config.notification.checkTimeout + "ms).");

    document.addEventListener('keydown', function (event) {
        //log("Ctrl: " + event.ctrlKey + "; Alt: " + event.altKey + "; Shift: " + event.shiftKey +
        //    "; Key: " + event.key + "; Code: " + event.code);
        // Ctrl+Shift+<Num> -> Select Sidebar Item (1-5)
        if (event.altKey && event.ctrlKey && event.shiftKey && (event.code == 'KeyA' || event.code == 'KeyV')) {
            startMeetNowCall(event.code == 'KeyV');
            event.stopPropagation();
            event.preventDefault();
        }

    }, true);
    log("Teams Enhancer: shortcuts assigned.");

    setTimeout(function () {
        GM_registerMenuCommand("Adjust Chat Text Font Size", promptAndAdjustChatTextSize, "t");
        adjustChatTextSize(config.ui.chatTextSize);
        GM_registerMenuCommand("Adjust side Panel Size", promptAndAdjustSidePanelSize, "s");
        adjustSidePanelSize(config.ui.sidePanelSize);
        GM_registerMenuCommand("Toggle Invite to Teams button", toggleInviteToTeamsButton, "i");
        if (!config.ui.inviteToTeamsVisibility) {
            toggleInviteToTeamsButton();
        }

        configHelper.addConfigMenu(CONFIG_NAMESPACE, JSON.stringify(DEFAULT_CONFIG));

        log("Teams Enhancer: menu commands registered, UI adjustments applied.");
    }, config.ui.startupDelay);
})();
