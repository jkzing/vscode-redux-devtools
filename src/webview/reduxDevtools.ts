export function getDevtoolContent(externals: any) {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>Remote Devtools</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="renderer" content="webkit" />
    <style>
      html,
      body,
      #root {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script src="https://cdn.jsdelivr.net/npm/react@16.7.0/umd/react.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@16.7.0/umd/react-dom.production.min.js"></script>
  <script src="${externals.reduxDevtoolsCore}"></script>
  <script>
    const root = document.getElementById('root')
    ReactDOM.render(
      React.createElement(
        ReduxDevTools.default,
        {
          socketOptions: {
            hostname: 'localhost',
            port: '8000',
            autoReconnect: true,
          },
        },
        'Remote Devtools'
      ),
      root
    )
  </script>
</html>`
}
