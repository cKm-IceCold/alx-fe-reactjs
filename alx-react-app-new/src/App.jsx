import { useState } from 'react'
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import Counter from './components/Counter';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Counter />
    </>
  )
}

export default App
