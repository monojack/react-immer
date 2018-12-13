import Observable from './Observable'
import produce from 'immer'

export class Subscription {
  constructor (unsubscribe) {
    this.unsubscribe = unsubscribe
  }
}

export class Store extends Observable {
  constructor (value) {
    super(function subscribe (observer) {
      value != null && observer.next(value)
      this.observers.push(observer)
      return new Subscription(() => {
        const index = this.observers.indexOf(observer)
        if (index >= 0) this.observers.splice(index, 1)
      })
    })

    this._value = value
    this.observers = []
  }

  next (x) {
    this.observers.forEach(observer => {
      observer.next(x, this._value)
    })
    this._value = x
  }

  update (cb) {
    this.next(produce(this._value, cb))
  }

  get value () {
    return this._value
  }
}

export default new Store()
