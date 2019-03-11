import { createStore } from 'redux'
import devToolsEnhancer from 'remote-redux-devtools'

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const store = createStore(
  counter,
  devToolsEnhancer({
    realtime: true,
    name: 'simple-redux',
    hostname: '127.0.0.1',
    port: 1024
  })
)

export default store
