import { useState, useEffect, } from 'react'

import shallowEqual from './shallowEqual'
import applySpec from './applySpec'
import state$ from './store'

export default function useImmerHook (spec) {
  const [ state, setState, ] = useState(applySpec(spec)(state$.value))

  useEffect(() => {
    const update = applySpec(spec)(state$.value)
    if (!shallowEqual(state, update)) setState(update)

    const sub = state$.subscribe({
      next: v => {
        const prevState = applySpec(spec)(state$.value)
        const nextState = applySpec(spec)(v)

        if (!shallowEqual(prevState, nextState)) {
          setState(nextState)
        }
      },
    })

    return () => sub.unsubscribe()
  }, [])

  return [ state, state$.update.bind(state$), ]
}
