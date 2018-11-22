import $$observable from 'symbol-observable'

export class Observable {
  constructor(subscriber) {
    if (!(this instanceof Observable))
      throw new TypeError('Observable cannot be called as a function')

    if (typeof subscriber !== 'function')
      throw new TypeError('Observable initializer must be a function')

    this._subscriber = subscriber
  }

  subscribe(observer) {
    if (typeof observer !== 'object' || observer === null) {
      observer = {
        next: observer,
        error: arguments[1],
        complete: arguments[2],
      }
    }
    return this._subscriber(observer)
  }

  [$$observable]() {
    return this
  }
}
