import state$ from './Store'

export default function createStore (initialState) {
  state$.next(initialState)
}
