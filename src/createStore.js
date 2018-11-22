import state$ from './store'

export default function createStore (initialState) {
  state$.next(initialState)
}
