import { Fragment, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Fragment>
      {count}
      <button onClick={() => setCount(prev => prev + 1)}>+</button>
    </Fragment>
  )
}

export default App
