import $$observable from 'symbol-observable'

export default class Observable {
  constructor (subscriber) {
    this._subscriber = subscriber
  }

  subscribe (observer) {
    return this._subscriber(observer)
  }

  [$$observable] () {
    return this
  }
}
