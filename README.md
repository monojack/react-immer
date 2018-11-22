## react-immer

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
