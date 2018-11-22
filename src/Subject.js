import { Observable } from "./Observable";

export class Subscription {
  constructor(unsubscribe) {
    this.unsubscribe = unsubscribe;
  }
}

export class Subject extends Observable {
  constructor(value) {
    super(function subscribe(observer) {
      value != null && observer.next(value);
      this.observers.push(observer);
      return new Subscription(() => {
        const index = this.observers.indexOf(observer);
        if (index >= 0) this.observers.splice(index, 1);
      });
    });

    this._value = value;
    this.observers = [];
  }

  next(x) {
    this.observers.forEach(observer => {
      observer.next(x);
    });
    this._value = x;
  }

  error(e) {
    this.observers.forEach(observer => observer.error(e));
  }

  complete() {
    this.observers.forEach(observer => observer.complete());
  }

  get value() {
    return this._value;
  }
}
