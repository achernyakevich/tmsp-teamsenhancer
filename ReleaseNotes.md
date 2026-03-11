# Release Notes

## v. 0.6-SNAPSHOT

### Enhancements

* Introduced configuration management and persisting.
* Menu item to hide/show Invite to Teams button in Chat panel.
* Added support of web version on https://teams.cloud.microsoft/.
* Added support for shortcuts `Ctrl+Alt+Shift+A` and `Ctrl+Alt+Shift+V` - Audio
and Video call for both direct and group chats.

### Fixes

* Fixed possibility to adjust chat text font size in case Chat density is set
to Compact.

### Removed

* Removed support for shortcuts `Ctrl+Alt+<Num_1-5>` (switching between sidebar
elements `Chat`, `Meet`, `Communities`, `Calendar`, `Activity`) in favor of
standard `Ctrl+Shift<Num_1-6>` added in the last version.


## v. 0.5.0

### General

* Migrated from Bitbucket (https://bitbucket.org/achernyakevich/tmsp-teamsenhancer/)
to GitHub (https://github.com/achernyakevich/tmsp-teamsenhancer).


## v. 0.4.1

### Enhancements

* Improved stability of script initialization (adjusting UI, menu commands registration).

### Fixes

* Added support https://teams.microsoft.com/v2/ URLs.


## v. 0.4.0

### Enhancements

* Added possibility to adjust side panel size (between 250px and 500px) in
Tampermonkey script menu.

### Fixes

* Fixed possibility to adjust chat text font size for Chrome browser 


## v. 0.3.1

### Enhancements

* Possibility to adjust chat text font size - more explicit CSS selector.
* Switching sidebar elements - added support of `Ctrl+Shift+<Num_1-5>` (prevent
shortcut conflicts on Linux with KDE).


## v. 0.3.0

### Enhancements

* Added possibility to adjust chat text font size (from 1 to 5) in Tampermonkey
script menu.


## v. 0.2.0

### Enhancements

* Added support for shortcuts `Ctrl+Alt+<Num_1-5>` - switching between sidebar
elements `Chat`, `Meet`, `Communities`, `Calendar`, `Activity`.


## v. 0.1.0

### Enhancements

* Informing about unread chats/activities detected
