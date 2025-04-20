// ==UserScript==
// @name         Teams Enhancer
// @namespace    https://bitbucket.org/achernyakevich/tmsp-teamsenhancer/
// @version      0.3.0
// @description  Microsoft Teams (web version) enhancer. It helps to handle unread messages, etc.
// @author       Alexander Chernyakevich
// @match        https://teams.live.com/v2*
// @grant        GM_notification
// @grant        GM_registerMenuCommand
// @grant        GM_log
// ==/UserScript==

(function () {
    'use strict';

    const LOG_DEBUG = false;
    const CHAT_TEXT_SIZE = 3;
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

    function adjustChatTextSize(size) {
        if (size >= 1 && size <= 5) {
            let style = document.getElementById("chatTextSizeStyle");
            if (!style) {
                style = document.createElement('style');
                style.id = "chatTextSizeStyle";
                document.head.appendChild(style);
            }
            style.innerHTML = `.fkhj508 { font-size: var(--fontSizeBase${size}00) !important; }`;
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

    GM_registerMenuCommand("Adjust Chat Text Font Size", promptAndAdjustChatTextSize, "a");
    adjustChatTextSize(CHAT_TEXT_SIZE);

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

    function selectSidebarItem(itemCode) {
        switch (itemCode) {
            case 'Digit1':
                document.querySelector('button[aria-label="Chat"]').click();
                break;
            case 'Digit2':
                document.querySelector('button[aria-label="Meet"]').click();
                break;
            case 'Digit3':
                document.querySelector('button[aria-label="Communities"]').click();
                break;
            case 'Digit4':
                document.querySelector('button[aria-label="Calendar"]').click();
                break;
            case 'Digit5':
                document.querySelector('button[aria-label="Activity"]').click();
                break;
            default:
                log("Unsupported sidebar item: " + itemCode);
        }
    }

    setInterval(checkUnreadBlocks, checkTimeout);
    log("Teams Enhancer: started (checking interval: " + checkTimeout + "ms).");

    document.addEventListener('keydown', function(event) {
        //log("Ctrl: " + event.ctrlKey + "; Alt: " + event.altKey + "; Shift: " + event.shiftKey +
        //    "; Key: " + event.key + "; Code: " + event.code);
        // Ctrl+Shift+<Num> -> Select Sidebar Item (1-5)
        if ( event.ctrlKey && event.altKey &&
             ( event.code == 'Digit1' || event.code == 'Digit2' || event.code == 'Digit3' ||
               event.code == 'Digit4' || event.code == 'Digit5' ) ) {
            selectSidebarItem(event.code);
            event.stopPropagation();
            event.preventDefault();
        }

    }, true);
    log("Teams Enhancer: shortcuts assigned.");

})();
