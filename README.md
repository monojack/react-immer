## react-immer

[![Build Status](https://travis-ci.org/monojack/react-immer.svg?branch=master)](https://travis-ci.org/monojack/react-immer)
[![npm version](https://img.shields.io/npm/v/react-immer.svg)](https://www.npmjs.com/package/react-immer)
[![npm downloads](https://img.shields.io/npm/dm/react-immer.svg)](https://www.npmjs.com/package/react-immer)
[![minified size](https://badgen.net/bundlephobia/min/react-immer)](https://bundlephobia.com/result?p=react-immer@latest)

No nonsense state management with [Immer](https://github.com/mweststrate/immer) and [React hooks](https://reactjs.org/docs/hooks-intro.html)

**TL;DR**

`index.js`

```js
import React from 'react'
import ReactDOM from 'react'

import { createStore } from 'react-immer'
import Counter from './Counter'

createStore({ count: 1 })

function App() {
  return <Counter />
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

&nbsp;

`Counter.js`

```js
/* Counter.js */

import React from 'react'
import { useImmer } from 'react-immer'

export default function Counter() {
  const [{ count }, produce] = useImmer({ count: state => state.count })

  const decrement = draft => {
    draft.count -= 1
  }

  const increment = draft => {
    draft.count += 1
  }

  return (
    <div>
      <button onClick={() => produce(decrement)}>-</button>
      <span>{count}</span>
      <button onClick={() => produce(increment)}>+</button>
    </div>
  )
}
```

[![Edit react-immer-tldr](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/yq328o9rvx)

What's cool about **react-immer** is that if you don't support [Hooks](https://reactjs.org/docs/hooks-intro.html) yet, you can use it inline and it will work like a [render prop](https://reactjs.org/docs/render-props.html). In this case, it takes two arguments, the _spec object_ and the _render function_.

```js
/* Counter.js */

import React from 'react' // < v16.7.*
import { useImmer } from 'react-immer'

export default function Counter() {
  const decrement = draft => {
    draft.count -= 1
  }

  const increment = draft => {
    draft.count += 1
  }

  // useImmer(specObj, renderFn)
  return (
    <div>
      {useImmer({ count: state => state.count }, ({ count }, produce) => (
        <span>
          <button onClick={() => produce(decrement)}>-</button>
          <span>{count}</span>
          <button onClick={() => produce(increment)}>+</button>
        </span>
      ))}
    </div>
  )
}
```

Or, if you don't like the syntax, you can always use the **Immer** component

```js
/* Counter.js */

import React from 'react' // < v16.7.*
import { Immer } from 'react-immer'

export default function Counter() {
  const decrement = draft => {
    draft.count -= 1
  }

  const increment = draft => {
    draft.count += 1
  }

  return (
    <Immer spec={{ count: state => state.count }}>
      {({ count }, produce) => (
        <span>
          <button onClick={() => produce(decrement)}>-</button>
          <span>{count}</span>
          <button onClick={() => produce(increment)}>+</button>
        </span>
      )}
    </Immer>
  )
}
```
