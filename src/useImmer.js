import { useState, useEffect, } from 'react'
import { produce, } from 'immer'

import shallowEqual from './shallowEqual'
import applySpec from './applySpec'
import state$ from './store'

export default function useImmer (spec) {
  const [ state, setState, ] = useState(applySpec(spec)(state$.value))

  useEffect(
    () => {
      const sub = state$.subscribe({
        next: v => {
          const nextState = applySpec(spec)(v)
          if (!shallowEqual(state, nextState)) {
            setState(nextState)
          }
        },
      })

      return () => sub.unsubscribe()
    },
    [ spec, ]
  )

  const update = cb => {
    const nextState = produce(state$.value, cb)
    state$.next(nextState)
  }

  return [ state, update, ]
}
