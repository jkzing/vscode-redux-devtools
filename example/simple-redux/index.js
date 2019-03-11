import store from './store'

inc.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' })
})

dec.addEventListener('click', () => {
  store.dispatch({ type: 'DECREMENT' })
})

store.subscribe(() => {
  count.innerHTML = store.getState()
})
