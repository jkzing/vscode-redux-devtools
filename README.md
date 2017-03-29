# Redux DevTools for VSCode

Visual Studio Code extension to include remotedev-app into editor.

Due to limition of vscode extension api, this extension need to load external resources. That means this extension will **only work with Internet connected**.

> Please note that this is an expiremental extension for now, contains several known issues. 
>
> No guarantees until official beta version release, but you are welcome to take a shot.

## Features

Inspect redux actions for your own app. Like the one you may use in Chrome.

![Feature](assets/demo.png)

## Quick Start

* Install the extension

* `cmd+shift+P` to open **Command Palette** and use command `Open Redux Devtools` to open the devtool in side panel.

* In devtool pannel, click settings to set listening port and host to your remotedev server.

* Optional, if you don't have an remotedev server running, you may want to write some script to start one. Here is an example:

  ```javascript
  const remotedev = require('remotedev-server');

  remotedev({
      hostname: '127.0.0.1',
      port: 1024,
  });
  ```

  (After that you can follow step 3 to set your local host and port)

* Additionally, you also need to compose remote redux devtool middleware into your redux store:

  ```javascript
  import {createStore, applyMiddleware} from 'redux';
  import {composeWithDevTools} from 'remote-redux-devtools';

  let composeEnhancers = composeWithDevTools({
      realtime: true,
      name: 'Your Instance Name',
      host: '127.0.0.1',
      port: 1024, // the port your remotedev server is running at
  });

  const store = createStore(
      yourReducer,
      composeEnhancers(
          applyMiddleware(...)
      )
  );
  ```

  ​

## Extension Settings

Comming soon.

## Release Notes

## Known Issues

* monitor icon not display correctly
* click event not handled in Inspector select and Settings dialog, [#31](https://github.com/zalmoxisus/remotedev-app/issues/31)
* extension only work with internet (it will load external resources).

## License
MIT

*powered by remotedev-app.*