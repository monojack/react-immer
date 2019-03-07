import { Component, } from 'react'

import state$ from './store'
import shallowEqual from './shallowEqual'
import applySpec from './applySpec'

export default class Immer extends Component {
  constructor (props) {
    super(props)

    this._state = applySpec(props.spec)(state$.value)
  }

  componentDidMount () {
    this.sub = state$.subscribe({
      next: v => {
        const nextState = applySpec(this.props.spec)(v)
        if (!shallowEqual(this._state, nextState)) {
          this._state = nextState
          this.forceUpdate()
        }
      },
    })
  }

  componentDidUpdate (prevProps) {
    if (!shallowEqual(prevProps.spec, this.props.spec)) {
      this._state = applySpec(this.props.spec)(state$.value)
      this.forceUpdate()
    }
  }

  componentWillUnmount () {
    this.sub && this.sub.unsubscribe()
  }

  render () {
    return this.props.children(this._state, state$.update.bind(state$))
  }
}
