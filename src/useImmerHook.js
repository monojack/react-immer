import { useState, useEffect, } from 'react'

import shallowEqual from './shallowEqual'
import applySpec from './applySpec'
import state$ from './store'

export default function useImmerHook (spec) {
  const [ state, setState, ] = useState(applySpec(spec)(state$.value))

  useEffect(() => {
    const sub = state$.subscribe({
      next: (next, prev) => {
        const prevState = applySpec(spec)(prev)
        const nextState = applySpec(spec)(next)

        if (!shallowEqual(prevState, nextState)) {
          setState(nextState)
        }
      },
    })

    return () => sub.unsubscribe()
  }, [])

  return [ state, state$.update.bind(state$), ]
}
