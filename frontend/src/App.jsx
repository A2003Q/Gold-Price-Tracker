
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LangingPage from './pages/LangingPage'
import { CurrencyProvider } from './context/CurrencyContext'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
      <CurrencyProvider>
        <Routes>
          <Route path='/' element={<LangingPage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </CurrencyProvider>
    </>
  )
}

export default App
