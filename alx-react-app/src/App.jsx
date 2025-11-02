import { useState } from 'react'
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header /> <MainContent /> <Footer />jdhd
    </> 
  )
}

export default App
