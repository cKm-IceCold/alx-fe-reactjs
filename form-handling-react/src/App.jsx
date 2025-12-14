import { useState } from 'react'
import RegisterationForm from './components/RegisterationForm'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <RegisterationForm/>
    </>
  )
}

export default App;

