
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LangingPage from './pages/LangingPage'
import { CurrencyProvider } from './context/CurrencyContext'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {

  return (
    <>
      <CurrencyProvider>
        <Routes>
          <Route path='/' element={<LangingPage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </CurrencyProvider>
    </>
  )
}

export default App
