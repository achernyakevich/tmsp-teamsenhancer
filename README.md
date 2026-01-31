## Intro ##

The `TeamsEnhancer.user.js` designed to bring additional functionality and UI
enhancements to [Teams](https://teams.live.com/).

To install script click the following link -
[GmailEnhancer.user.js](https://github.com/achernyakevich/tmsp-teamsenhancer/raw/refs/heads/main/TeamsEnhancer.user.js).


## Features

### Informing about unread chats/activities detected

Teams UI scanned every 30s (configurable by `notification.checkTimeout`, ms)
and if unread chats/activities detected then browser's tab icon updated to
show it by red spot.

Additionally, if `notification.showNotification` configured to `true` then
system notification alert is activated.

### Adjusting chat text font size

User can adjust chat text font size (1-5) by Tampermonkey script menu. `1` is
smallest, `5` is biggest.

Default chat text font size is configurable by `ui.chatTextSize`.

### Adjusting side panel size

User can adjust side panel size (250px-500px) by Tampermonkey script menu.

Default side panel size is configurable by `ui.sidePanelSize`.

### Shortcuts

* Switching sidebar elements:
  * `Ctrl+Alt+1` or `Ctrl+Shift+1` - `Chat`
  * `Ctrl+Alt+2` or `Ctrl+Shift+2` - `Meet`
  * `Ctrl+Alt+3` or `Ctrl+Shift+3` - `Communities`
  * `Ctrl+Alt+4` or `Ctrl+Shift+4` - `Calendar`
  * `Ctrl+Alt+5` or `Ctrl+Shift+5` - `Activity`

### Configuration

The script configuration could be changed by calling `Update Config`,
`Show Config`, `Delete Config` commands in Tampermonkey menu.

### Other

See more in detailed [Release Notes](./ReleaseNotes.md).


## Contribution guidelines ##

If you would like to contribute - create a pull request to merge back to `dev`
branch.

If you have found a bug or need some features or would like to propose some
features - create an issue. But we will appreciate if you will first check
the list of [already existed issues](https://github.com/achernyakevich/tmsp-teamsenhancer/issues)
to prevent creation of duplicates.
