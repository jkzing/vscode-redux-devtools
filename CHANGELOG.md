# Change Log

## 1.0.0
### Changed
- refactor: use vscode WebView API instead of `vscode.previewHtml` [@jkzing](https://github.com/jkzing)
- refactor: use `redux-devtools-core` insteadof `remotedev-app` [@jkzing](https://github.com/jkzing)
- refactor: load resouce (script) locally [@jkzing](https://github.com/jkzing)
- fix: read and load user settings properly, close #5 [@jkzing](https://github.com/jkzing)

### Added
- docs: add a simple redux app for example [@jkzing](https://github.com/jkzing)

### BREAKING CHANGES
- `reduxdev.socketPort` is renamed to `reduxdev.port`
